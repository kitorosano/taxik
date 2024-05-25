<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): Response
  {

    $name = $request->query('d', '');

    if ($name === '') {
      $users = User::all();
    } else {
      $users = User::where('name', 'like', "%$name%")->get();
    }

    return Inertia::render('Users/Admin', [
      'users' =>  $users,
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
  public function show(User $user)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $user)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, User $user)
  {
    Gate::authorize('update', $user);

    $validated = $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'max:255'],
    ]);

    $user->update($validated);

    return redirect(route('users.index'));
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $user)
  {
    Gate::authorize('delete', $user);

    $user->delete();

    return redirect(route('users.index'));
  }
}
