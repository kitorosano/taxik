<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTravelOrderRequest;
use App\Http\Requests\UpdateTravelOrderRequest;
use App\Http\Resources\TravelOrderResource;
use App\Models\TravelOrder;
use Illuminate\Database\Eloquent\Builder;
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
  public function index(Request $request): Response
  {

    // filters
    $id = $request->query('id', '');
    $departure_date_from = $request->query('departureDateFrom', '');
    $departure_date_to = $request->query('departureDateTo', '');
    $arrival_date_from = $request->query('arrivalDateFrom', '');
    $arrival_date_to = $request->query('arrivalDateTo', '');

    $user = auth()->user();


    $orders = TravelOrder::query()
      ->when($user->isClient, function (Builder $query) use ($user) {
        return $query->where('client_id', '=', $user->id);
      })
      ->when($user->isCompany, function (Builder $query) use ($user, $id, $departure_date_from, $departure_date_to, $arrival_date_from, $arrival_date_to) {
        return $query->where('company_id', '=', $user->id)
          ->when($id, function (Builder $query, $id) {
            return $query->where('id', 'like', "%$id%");
          })
          ->when($departure_date_from, function (Builder $query, $departure_date_from) {
            return $query->where('departure_date', '>=', $departure_date_from);
          })
          ->when($departure_date_to, function (Builder $query, $departure_date_to) {
            return $query->where('departure_date', '<=', $departure_date_to);
          })
          ->when($arrival_date_from, function (Builder $query, $arrival_date_from) {
            return $query->where('estimated_arrival_date', '>=', $arrival_date_from);
          })
          ->when($arrival_date_to, function (Builder $query, $arrival_date_to) {
            return $query->where('estimated_arrival_date', '<=', $arrival_date_to);
          });
      })
      ->orderBy('created_at', 'desc')
      ->orderBy('status', 'asc')
      ->paginate(8)
      ->withQueryString();

    if (auth()->check() && auth()->user()->isCompany) {
      return Inertia::render('Orders/Company', [
        'orders' => TravelOrderResource::collection($orders),
        'filters' => [
          'id' => $id,
          'departure_date_from' => $departure_date_from,
          'departure_date_to' => $departure_date_to,
          'arrival_date_from' => $arrival_date_from,
          'arrival_date_to' => $arrival_date_to,
        ],
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
