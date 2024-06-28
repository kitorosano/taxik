<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaxiResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'company_id' => $this->company_id,
      'driver_name' => $this->driver_name,
      'driver_picture' => $this->driver_picture,
      'car_registration' => $this->car_registration,
      'car_model' => $this->car_model,
      'car_information' => $this->car_model . ' - ' . $this->car_registration,
      'is_available' => $this->isAvailableNow
    ];
  }
}
