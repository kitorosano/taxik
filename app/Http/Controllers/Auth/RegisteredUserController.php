<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
  /**
   * Display the registration view.
   */
  public function create(): Response
  {
    return Inertia::render('Auth/Register');
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(RegisterRequest $request): RedirectResponse
  {
    $validated = $request->validated();

    $user = User::create([
      'name' => $validated->name,
      'email' => $validated->email,
      'password' => Hash::make($validated->password),
      'type' => $validated->type,
    ]);

    event(new Registered($user));

    Auth::login($user);

    if ($user->isCompany) {
      return redirect(route('profile.edit', absolute: false))->with([
        'message' => trans('notifications.user-login', ['user' => $user->name]),
        'messageType' => 'info',
      ]);
    }
    return redirect(route('contacts.index', absolute: false))->with([
      'message' => trans('notifications.user-login', ['user' => $user->name]),
      'messageType' => 'info',
    ]);
  }
}
