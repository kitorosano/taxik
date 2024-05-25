<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  if (auth()->check()) {
    return redirect()->route('dashboard');
  } else {
    return Inertia::render('Welcome', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),
      'laravelVersion' => Application::VERSION,
      'phpVersion' => PHP_VERSION,
    ]);
  }
});

Route::get('/dashboard', function () {
  return redirect()->route('contacts.index');
})->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
Route::resource('contacts', ContactController::class)
  ->only(['store', 'update', 'destroy'])
  ->middleware(['auth', 'can:create,App\Models\Contact']);

Route::resource('users', UserController::class)
  ->only(['index', 'update', 'destroy'])
  ->middleware(['auth', 'can:viewAny,App\Models\User']);


require __DIR__ . '/auth.php';
