<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Resources\CompaniesResource;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use App\Models\User;
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
    $PAGINATION_COUNT = auth()->check() && auth()->user()->isAdmin ? 8 : 16;

    // filters
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

    $companies = User::query()->where('type', '=', 2)->get();

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
        'companies' => CompaniesResource::collection($companies),
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

    $contact = Contact::create($validated);

    if ($request->user()->isCompany) {
      return redirect(route('profile.edit'))->with([
        'message' => trans('notifications.contact-create.company'),
        'messageType' => 'success',
      ]);
    }
    return redirect(route('contacts.index'))->with([
      'message' => trans('notifications.contact-create.admin', ['contact' => $contact->name]),
      'messageType' => 'success',
    ]);
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
      return redirect(route('profile.edit'))->with([
        'message' => trans('notifications.contact-update.company'),
        'messageType' => 'success',
      ]);
    }
    return redirect(route('contacts.index'))->with([
      'message' => trans('notifications.contact-update.admin', ['contact' => $contact->name]),
      'messageType' => 'success',
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Contact $contact): RedirectResponse
  {
    Gate::authorize('delete', $contact);

    if ($contact->linkedCompany()->exists()) {
      return redirect(route('contacts.index'))->with([
        'message' => trans('notifications.contact-delete-error', ['company' => $contact->companyName]),
        'messageType' => 'error',
      ]);
    }

    $contact->delete();

    return redirect(route('contacts.index'))->with([
      'message' => trans('notifications.contact-delete', ['contact' => $contact->name]),
      'messageType' => 'success',
    ]);
  }
}
