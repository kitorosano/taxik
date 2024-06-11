<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TravelOrderResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {

    if ($request->user()->isCompany) {
      return [
        'id' => $this->id,
        'client' => $this->clientName,
        'price' => $this->price,
        'status' => $this->statusString,
        'origin' => $this->origin,
        'departureDate' => $this->departure_date->format('d/m/Y H:i'),
        'destination' => $this->destination,
        'estimatedArrivalDate' => $this->estimated_arrival_date->format('d/m/Y H:i'),
      ];
    }

    return [
      'id' => $this->id,
      'company' => $this->companyName,
      'price' => $this->price,
      'status' => $this->statusString,
      'origin' => $this->origin,
      'departureDate' => $this->departure_date->format('d/m/Y H:i'),
      'destination' => $this->destination,
      'estimatedArrivalDate' => $this->estimated_arrival_date->format('d/m/Y H:i'),
    ];
  }
}
