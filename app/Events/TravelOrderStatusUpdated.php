<?php

namespace App\Events;

use App\Models\TravelOrder;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TravelOrderStatusUpdated implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $travelOrder;

  /**
   * Create a new event instance.
   */
  public function __construct(TravelOrder $travelOrder)
  {
    $this->travelOrder = $travelOrder;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    if ($this->travelOrder->status === TravelOrder::$STATUS_CODES['pending']) {

      $user = User::find($this->travelOrder->company_id);
      $user->notifications()->create([
        'title' => trans('notifications.travel-order-update.company.title'),
        'description' => trans('notifications.travel-order-update.company.message', [
          'id' => $this->travelOrder->id,
          'client' => $this->travelOrder->client->name,
        ]),
      ]);

      return [
        new Channel('company.' . $this->travelOrder->company_id),
      ];
    }

    $user = User::find($this->travelOrder->client_id);
    $user->notifications()->create([
      'title' => trans('notifications.travel-order-update.client.title'),
      'description' => trans('notifications.travel-order-update.client.message', [
        'id' => $this->travelOrder->id,
        'status' => $this->travelOrder->statusString,
      ])
    ]);

    return [
      new Channel('client.' . $this->travelOrder->client_id),
    ];
  }
}
