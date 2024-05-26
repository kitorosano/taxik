<?php

namespace App\Http\Controllers;

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
    $PAGINATION_COUNT = Auth::user()->isAdmin ? 8 : 16;

    $department = $request->query('d', '');

    if ($department === '') {
      $contacts = Contact::paginate($PAGINATION_COUNT);
    } else {
      $contacts = Contact::where('department', 'like', "%$department%")->paginate($PAGINATION_COUNT);
    }

    if (Auth::check() && Auth::user()->isAdmin) {
      return Inertia::render('Contacts/Admin', [
        'contacts' => ContactResource::collection($contacts),
      ]);
    }

    return Inertia::render('Contacts/Index', [
      'contacts' =>  ContactResource::collection($contacts),
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
  public function store(Request $request): RedirectResponse
  {
    // validate admin
    Gate::authorize('create', Contact::class);

    $validated = $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'string', 'max:255'],
      'address' => ['required', 'string', 'max:255'],
      'department' => ['required', 'string', 'max:255'],
      'linked_company_id' => ['sometimes', 'int', 'exists:users,id'],
    ]);

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
  public function update(Request $request, Contact $contact): RedirectResponse
  {
    Gate::authorize('update', $contact);

    $validated = $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'string', 'max:255'],
      'address' => ['required', 'string', 'max:255'],
      'department' => ['required', 'required', 'string', 'max:255'],
      'linked_company_id' => ['sometimes', 'required', 'int', 'exists:users,id'],
    ]);

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
