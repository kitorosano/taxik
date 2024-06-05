<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTravelOrderRequest;
use App\Models\TravelOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TravelOrderController extends Controller
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
  public function store(StoreTravelOrderRequest $request)
  {
    // Gate::authorize('create', TravelOrder::class);

    $validated = $request->validated();

    TravelOrder::create([
      'client_id' => $request->user()->id,
      'company_id' => $validated['company_id'],
      'origin' => $validated['origin'],
      'destination' => $validated['destination'],
      'departure_date' => $validated['departure_date'],
      'price' => $validated['price'],
      'estimated_arrival_date' => $validated['estimated_arrival_date'],
      'status' => 0,
    ]);

    // TODO: Dispatch an event to notify the company that a new travel order has been created

    return redirect(route('companies.index')); // TODO: Redirect to the travel order index page
  }

  /**
   * Display the specified resource.
   */
  public function show(TravelOrder $travelOrder)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(TravelOrder $travelOrder)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, TravelOrder $travelOrder)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(TravelOrder $travelOrder)
  {
    //
  }
}
