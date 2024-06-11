<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTravelOrderRequest;
use App\Http\Requests\UpdateTravelOrderRequest;
use App\Http\Resources\TravelOrderResource;
use App\Models\TravelOrder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
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
      ->when(auth()->user()->isClient, function ($query) {
        return $query->where('client_id', '=', auth()->user()->id);
      })
      ->when(auth()->user()->isCompany, function ($query) {
        return $query->where('company_id', '=', auth()->user()->id);
      })
      ->orderBy('created_at', 'desc')
      ->paginate(8)
      ->withQueryString();

    if (auth()->check() && auth()->user()->isCompany) {
      return Inertia::render('Orders/Company', [
        'orders' => TravelOrderResource::collection($orders),
      ]);
    }

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
  public function update(UpdateTravelOrderRequest $request, TravelOrder $travelOrder): RedirectResponse
  {
    Gate::authorize('update', $travelOrder);

    $validated = $request->validated();

    $travelOrder->update($validated);

    return redirect(route('travel-order.index'));
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(TravelOrder $travelOrder)
  {
    //
  }
}
