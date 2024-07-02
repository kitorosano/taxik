<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $CLIENT_LIMIT = 5;
    $COMPANY_LIMIT = 8;
    $ADMIN_LIMIT = 8;

    $limit = match ($request->user()->type) {
      0 => $ADMIN_LIMIT,
      1 => $CLIENT_LIMIT,
      2 => $COMPANY_LIMIT,
    };

    return $request->user()->notifications()->take($limit)->get();
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
  public function show(Notification $notification)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Notification $notification)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Notification $notification)
  {
    foreach ($request->user()->notifications as $notification) {
      $notification->markAsRead();
    }

    return $this->index($request);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Notification $notification)
  {
    //
  }
}
