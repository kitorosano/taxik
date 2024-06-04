<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompaniesResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): Response
  {
    $name = $request->query('name', '');

    Log::info(auth()->id());

    $favoriteCompanies = request()->user()
      ->favoriteCompanies()
      ->with('contact')
      ->get();


    $companies = User::query()
      ->where('type', '=', 2)
      ->when($name, function ($query, $name) {
        return $query->where('name', 'like', "%$name%");
      })
      ->whereNotIn('id', $favoriteCompanies->pluck('id'))
      ->with('contact')
      ->paginate(8)
      ->withQueryString();




    return Inertia::render('Companies/Index', [
      'companies' => CompaniesResource::collection($companies),
      'favoriteCompanies' => CompaniesResource::collection($favoriteCompanies), // TOFIX: Have it be a collection of favorite companies
      'filters' => [
        'name' => $name,
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
  public function update(Request $request, User $user)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $user)
  {
    //
  }
}
