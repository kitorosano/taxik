<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaxiRequest;
use App\Http\Resources\TaxiResource;
use App\Models\Taxi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TaxiController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $PAGINATION_COUNT = 5;

    // filters
    $driver_name = $request->query('driver_name', '');
    $car_registration = $request->query('car_registration', '');
    $car_model = $request->query('car_model', '');

    $taxis = Taxi::query()
      ->where('company_id', '=', request()->user()->id)
      ->when($driver_name, function ($query, $driver_name) {
        return $query->where('driver_name', 'like', "%$driver_name%");
      })
      ->when($car_registration, function ($query, $car_registration) {
        return $query->where('car_registration', 'like', "%$car_registration%");
      })
      ->when($car_model, function ($query, $car_model) {
        return $query->where('car_model', $car_model);
      })
      ->paginate($PAGINATION_COUNT)
      ->withQueryString();

    return Inertia::render('Taxis/Company', [
      'taxis' => TaxiResource::collection($taxis),
      'filters' => [
        'driver_name' => $driver_name,
        'car_registration' => $car_registration,
        'car_model' => $car_model,
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
  public function store(StoreTaxiRequest $request): RedirectResponse
  {
    Gate::authorize('create', Taxi::class);

    $validated = $request->validated();

    $taxi = Taxi::create($validated);

    return redirect()->route('taxis.index')->with([
      'message' => trans('notifications.taxi-create', ['driver' => $taxi->driver_name, 'registration' => $taxi->car_registration]),
      'messageType' => 'success',
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(Taxi $taxi)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Taxi $taxi)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(StoreTaxiRequest $request, Taxi $taxi): RedirectResponse
  {
    Gate::authorize('update', $taxi);

    $validated = $request->validated();

    $taxi->update($validated);

    return redirect()->route('taxis.index')->with([
      'message' => trans('notifications.taxi-update', ['driver' => $taxi->driver_name, 'registration' => $taxi->car_registration]),
      'messageType' => 'success',
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Taxi $taxi): RedirectResponse
  {
    Gate::authorize('delete', $taxi);

    $taxi->delete();

    return redirect()->route('taxis.index')->with([
      'message' => trans('notifications.taxi-delete', ['driver' => $taxi->driver_name, 'registration' => $taxi->car_registration]),
      'messageType' => 'success',
    ]);
  }
}
