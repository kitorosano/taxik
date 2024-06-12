<?php

namespace App\Http\Controllers;

use App\Models\ClientFavoriteCompany;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ClientFavoriteCompanyController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
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
    $user = request()->user();

    if ($user->favoriteCompanies()->where('company_id', $request->company_id)->exists()) {
      return redirect(route('companies.index'));
    }

    $company = User::find($request->company_id);
    Gate::authorize('create', [ClientFavoriteCompany::class, $company]);

    $user->favoriteCompanies()->attach($request->company_id);

    return redirect(route('companies.index'));
  }

  /**
   * Display the specified resource.
   */
  public function show($userFavoriteCompany)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit($userFavoriteCompany)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, $userFavoriteCompany)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy($companyId): RedirectResponse
  {
    $user = request()->user();

    if ($user->favoriteCompanies()->where('company_id', $companyId)->doesntExist()) {
      return redirect(route('companies.index'));
    }

    $company = User::find($companyId);
    Gate::authorize('delete', [ClientFavoriteCompany::class, $company]);

    $user->favoriteCompanies()->detach($companyId);

    return redirect(route('companies.index'));
  }
}
