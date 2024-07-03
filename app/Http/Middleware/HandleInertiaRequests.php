<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   */
  public function version(Request $request): string|null
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @return array<string, mixed>
   */
  public function share(Request $request): array
  {
    Log::info('HandleInertiaRequests', ['locale' => App::getLocale(), 'session' => Session::get('locale')]);
    return [
      ...parent::share($request),
      'auth' => [
        'user' => $request->user(),
      ],
      'flash' => [
        'message' => fn () => $request->session()->get('message') ?? "",
        'messageType' => fn () => $request->session()->get('messageType') ?? 'info',
      ],
      'locale' => Session::get('locale', 'es'),
    ];
  }
}
