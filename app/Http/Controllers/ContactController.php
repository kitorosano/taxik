<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
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

    return Inertia::render('Contacts/Index', [
      'contacts' =>  $contacts
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
  public function store(Request $request)
  {
    //
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
  public function update(Request $request, Contact $contact)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Contact $contact)
  {
    //
  }
}
