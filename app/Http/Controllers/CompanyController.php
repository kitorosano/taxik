<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompaniesResource;
use App\Models\User;
use Illuminate\Http\Request;
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

    $companies = User::query()
      ->where('type', '=', 2)
      ->when($name, function ($query, $name) {
        return $query->where('name', 'like', "%$name%");
      })
      ->with('contact')
      ->paginate(8)
      ->withQueryString();

    return Inertia::render('Companies/Index', [
      'companies' => CompaniesResource::collection($companies),
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
