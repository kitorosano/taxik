<?php

namespace App\Http\Requests;

use App\Rules\TaxiAvailable;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTravelOrderRequest extends FormRequest
{

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'assigned_taxi_id' => ['nullable', 'integer', 'exists:taxis,id'],
      'status' => ['required', 'integer', 'between:1,4'], // 1 - accepted, 2 - on trip, 3 - completed, 4 - canceled
    ];
  }
}
