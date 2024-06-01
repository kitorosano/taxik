<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
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
    $PAGINATION_COUNT =  8;

    $name = $request->query('name', '');
    $email = $request->query('email', '');
    $type = $request->query('type', '');

    $users = User::query()
      ->when($name, function ($query, $name) {
        return $query->where('name', 'like', "%$name%");
      })
      ->when($email, function ($query, $email) {
        return $query->where('email', 'like', "%$email%");
      })
      ->when($type, function ($query, $type) {
        return $query->where('type', $type);
      })
      ->paginate($PAGINATION_COUNT)
      ->withQueryString();

    return Inertia::render('Users/Admin', [
      'users' => UserResource::collection($users),
      'filters' => [
        'name' => $name,
        'email' => $email,
        'type' => $type,
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
  public function update(UpdateUserRequest $request, User $user)
  {
    Gate::authorize('update', $user);

    $validated = $request->validated();

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
