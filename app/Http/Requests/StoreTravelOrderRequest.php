<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTravelOrderRequest extends FormRequest
{

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'company_id' => ['required', 'int', 'exists:users,id'],
      'origin' => ['required', 'string', 'max:255'],
      'destination' => ['required', 'string', 'max:255'],
      'departure_date' => ['required', 'date'],
      'price' => ['required', 'numeric'],
      'estimated_arrival_date' => ['required', 'date'],
    ];
  }
}
