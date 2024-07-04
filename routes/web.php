<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientFavoriteCompanyController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SetLocaleController;
use App\Http\Controllers\TaxiController;
use App\Http\Controllers\TravelOrderController;
use App\Http\Middleware\SetLocaleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  if (auth()->check()) {
    return redirect()->route('contacts.index');
  } else {
    return Inertia::render('Welcome', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),
      'laravelVersion' => Application::VERSION,
      'phpVersion' => PHP_VERSION,
    ]);
  }
});

Route::get('/setlang', [LanguageController::class, 'changeLanguage'])->name('setlang');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/contacts', [ContactController::class, 'index'])
  ->middleware('language')
  ->name('contacts.index');
Route::get('/contacts/validate/{id}', [ContactController::class, 'validate'])
  ->middleware(['auth', 'can:create,App\Models\Contact'])
  ->name('contacts.validate');
Route::resource('contacts', ContactController::class)
  ->only(['store', 'update', 'destroy'])
  ->middleware(['auth', 'can:create,App\Models\Contact']);

Route::resource('users', UserController::class)
  ->only(['index', 'update', 'destroy'])
  ->middleware(['auth', 'can:viewAny,App\Models\User']);

// Route::get('/companies', [CompanyController::class, 'index'])
//   ->middleware(['auth', 'can:viewAny,App\Models\User'])
//   ->name('companies.index');
Route::resource('companies', CompanyController::class)
  ->only(['index'])
  ->middleware(['auth', 'can:viewAny,App\Models\User']);

Route::resource('favorite-companies', ClientFavoriteCompanyController::class)
  ->only(['store', 'destroy'])
  ->middleware(['auth']);

Route::resource('travel-order', TravelOrderController::class)
  ->only(['index', 'store', 'show', 'edit', 'update', 'destroy'])
  ->middleware(['auth', 'can:viewAny,App\Models\TravelOrder']);

Route::resource('taxis', TaxiController::class)
  ->only(['index', 'store', 'update', 'destroy'])
  ->middleware(['auth', 'can:viewAny,App\Models\Taxi']);

Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
Route::post('/notifications/watch', [NotificationController::class, 'update'])->name('notifications.watch');

require __DIR__ . '/auth.php';
