<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompaniesResource;
use App\Models\ClientFavoriteCompany;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOne;
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
    // filters
    $name = $request->query('name', '');
    $department = $request->query('department', '');

    $companies = User::query()
      ->where('type', '=', 2)
      ->when($name, function (Builder $query, $name) {
        return $query->where('name', 'like', "%$name%");
      })
      ->withWhereHas('contact', function ($query) use ($department) {
        $query->when($department, function (Builder $query, $department) {
          return $query->where('department', 'like', "%$department%");
        });
      })
      ->paginate(8)
      ->withQueryString();

    return Inertia::render('Companies/Index', [
      'companies' => CompaniesResource::collection($companies),
      'filters' => [
        'name' => $name,
        'department' => $department,
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
