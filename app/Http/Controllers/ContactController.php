<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): Response
  {
    $PAGINATION_COUNT = $request->user && $request->user->isAdmin ? 8 : 16;

    $name = $request->query('name', '');
    $phone = $request->query('phone', '');
    $address = $request->query('address', '');
    $department = $request->query('department', '');
    $companyName = $request->query('companyName', '');

    $contacts = Contact::query()
      ->when($name, function ($query, $name) {
        return $query->where('name', 'like', "%$name%");
      })
      ->when($phone, function ($query, $phone) {
        return $query->where('phone', 'like', "%$phone%");
      })
      ->when($address, function ($query, $address) {
        return $query->where('address', 'like', "%$address%");
      })
      ->when($department, function ($query, $department) {
        return $query->where('department', 'like', "%$department%");
      })
      ->when($companyName, function ($query, $companyName) {
        return $query->whereHas('linkedCompany', function ($query) use ($companyName) {
          return $query->where('name', 'like', "%$companyName%");
        });
      })
      ->paginate($PAGINATION_COUNT)
      ->withQueryString();


    if (Auth::check() && Auth::user()->isAdmin) {
      return Inertia::render('Contacts/Admin', [
        'contacts' => ContactResource::collection($contacts),
        'filters' => [
          'name' => $name,
          'phone' => $phone,
          'address' => $address,
          'department' => $department,
          'companyName' => $companyName,
        ],
      ]);
    }

    return Inertia::render('Contacts/Index', [
      'contacts' =>  ContactResource::collection($contacts),
      'filters' => [
        'department' => $department,
      ],
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreContactRequest $request): RedirectResponse
  {
    // validate admin
    Gate::authorize('create', Contact::class);

    $validated = $request->validated();

    Contact::create($validated);

    if ($request->user()->isCompany) {
      return redirect(route('profile.edit'));
    }
    return redirect(route('contacts.index'));
  }

  /**
   * Display the specified resource.
   */
  public function show(Contact $contact)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Contact $contact)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreContactRequest $request, Contact $contact): RedirectResponse
  {
    Gate::authorize('update', $contact);

    $validated = $request->validated();

    $contact->update($validated);

    if ($request->user()->isCompany) {
      return redirect(route('profile.edit'));
    }
    return redirect(route('contacts.index'));
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Contact $contact): RedirectResponse
  {
    Gate::authorize('delete', $contact);

    $contact->delete();

    return redirect(route('contacts.index'));
  }
}
