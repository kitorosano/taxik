<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTravelOrderRequest;
use App\Http\Resources\TravelOrderResource;
use App\Models\TravelOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TravelOrderController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $orders = TravelOrder::query()
      ->where('client_id', '=', auth()->user()->id)
      ->paginate(8)
      ->withQueryString();

    return Inertia::render('Orders/Index', [
      'orders' => TravelOrderResource::collection($orders),
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
  public function store(StoreTravelOrderRequest $request)
  {
    // Gate::authorize('create', TravelOrder::class); // TODO: Uncomment this line

    $validated = $request->validated();

    TravelOrder::create([
      'client_id' => $request->user()->id,
      'company_id' => $validated['company_id'],
      'origin' => $validated['origin'],
      'destination' => $validated['destination'],
      'departure_date' => $validated['departure_date'],
      'price' => $validated['price'],
      'estimated_arrival_date' => $validated['estimated_arrival_date'],
      'status' => 1,
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
