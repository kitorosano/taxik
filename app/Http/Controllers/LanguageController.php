<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
  public function changeLanguage(Request $request): RedirectResponse
  {
    $locale = $request->get('locale', 'es');

    Session::put('locale', $locale);

    return redirect()->back()->with([
      'locale' => $locale,
      "message" => trans("notifications.language-changed", ["lang" => trans("pages.language-switcher." . $locale, [], $locale)], $locale),
      "messageType" => "info",
    ]);
  }
}
