<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
  private $CLIENT_LIMIT = 5;
  private $COMPANY_LIMIT = 8;
  private  $ADMIN_LIMIT = 8;

  private function getLimit($type)
  {
    return match ($type) {
      0 => $this->ADMIN_LIMIT,
      1 => $this->CLIENT_LIMIT,
      2 => $this->COMPANY_LIMIT,
    };
  }

  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $limit = $this->getLimit($request->user()->type);

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

    $limit = $this->getLimit($request->user()->type);
    return $request->user()->notifications()->take($limit)->get();
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Notification $notification)
  {
    //
  }
}
