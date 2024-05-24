<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): Response
  {
    $department = $request->query('d', '');

    if ($department === '') {
      $contacts = Contact::all();
    } else {
      $contacts = Contact::where('address', 'like', "%$department%")->get();
    }

    if (Auth::check() && Auth::user()->isAdmin) {
      return Inertia::render('Contacts/Admin', [
        'contacts' =>  $contacts,
      ]);
    }

    return Inertia::render('Contacts/Index', [
      'contacts' =>  $contacts,
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
      'address' => ['required', 'string', 'max:255']
    ]);

    Contact::create($validated);

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
    ]);

    $contact->update($validated);

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
