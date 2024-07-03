<?php

namespace App\Http\Controllers;

use App\Events\TravelOrderStatusUpdated;
use App\Http\Requests\StoreTravelOrderRequest;
use App\Http\Requests\UpdateTravelOrderRequest;
use App\Http\Resources\TaxiResource;
use App\Http\Resources\TravelOrderResource;
use App\Models\Taxi;
use App\Models\TravelOrder;
use DateTimeZone;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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
    $selected_id = $request->query('selected_id', '');
    $departure_date_from = $request->query('departure_date_from', '');
    $departure_date_to = $request->query('departure_date_to', '');
    $arrival_date_from = $request->query('arrival_date_from', '');
    $arrival_date_to = $request->query('arrival_date_to', '');

    $user = auth()->user();

    $this->updateOrdersStatuses();

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
          })
          ->with('assignedTaxi');
      })
      ->orderBy('created_at', 'desc')
      ->orderBy('status', 'asc')
      ->paginate(8)
      ->withQueryString();

    $taxis = Taxi::query()
      ->where('company_id', '=', $user->id)
      ->when($selected_id, function (Builder $query, $selected_id) {
        $selectedTravelOrder = TravelOrder::query()->find($selected_id);

        if (!$selectedTravelOrder) {
          return $query;
        }

        return $query->whereNotIn(
          'id',
          TravelOrder::query()
            ->whereIn('status', [TravelOrder::$STATUS_CODES['approved'],  TravelOrder::$STATUS_CODES['on-trip']])
            ->where('departure_date', '<=', $selectedTravelOrder->estimated_arrival_date)
            ->where('estimated_arrival_date', '>=', $selectedTravelOrder->departure_date)
            ->pluck('assigned_taxi_id')
        );
      })
      ->get();

    if (auth()->check() && $user->isCompany) {
      return Inertia::render('Orders/Company', [
        'orders' => TravelOrderResource::collection($orders),
        'taxis' => TaxiResource::collection($taxis),
        'filters' => [
          'id' => $id,
          'selected_id' => $selected_id,
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

  private function updateOrdersStatuses(): void
  {
    $pendingOrders = TravelOrder::query()
      ->where('status', '=', TravelOrder::$STATUS_CODES['pending'])
      ->where('estimated_arrival_date', '<=', now(new DateTimeZone("America/Montevideo")))
      ->get();

    foreach ($pendingOrders as $order) {
      $order->update(['status' => TravelOrder::$STATUS_CODES['canceled']]);

      TravelOrderStatusUpdated::dispatch($order);
    }

    $approvedOrders = TravelOrder::query()
      ->where('status', '=', TravelOrder::$STATUS_CODES['approved'])
      ->where('departure_date', '<=', now(new DateTimeZone("America/Montevideo")))
      ->get();

    foreach ($approvedOrders as $order) {
      $order->update(['status' => TravelOrder::$STATUS_CODES['on-trip']]);

      TravelOrderStatusUpdated::dispatch($order);
    }

    $inProgressOrders = TravelOrder::query()
      ->where('status', '=', TravelOrder::$STATUS_CODES['on-trip'])
      ->where('estimated_arrival_date', '<=', now(new DateTimeZone("America/Montevideo")))
      ->get();

    foreach ($inProgressOrders as $order) {
      $order->update(['status' => TravelOrder::$STATUS_CODES['completed']]);

      TravelOrderStatusUpdated::dispatch($order);
    }
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
    Gate::authorize('create', TravelOrder::class);

    $validated = $request->validated();

    $travelOrder = TravelOrder::create([
      'client_id' => $request->user()->id,
      'company_id' => $validated['company_id'],
      'origin' => $validated['origin'],
      'destination' => $validated['destination'],
      'departure_date' => $validated['departure_date'],
      'price' => $validated['price'],
      'estimated_arrival_date' => $validated['estimated_arrival_date'],
      'status' => 0,
    ]);

    event(new TravelOrderStatusUpdated($travelOrder));

    return redirect(route('travel-order.index'))->with([
      'message' => trans('notifications.travel-order-create'),
      'messageType' => 'success',
    ]);
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

    TravelOrderStatusUpdated::dispatch($travelOrder);

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
