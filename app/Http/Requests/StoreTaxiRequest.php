<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaxiRequest extends FormRequest
{

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'company_id' => ['sometimes', 'int', 'exists:users,id'],
      'driver_name' => ['required', 'string', 'max:255'],
      'driver_picture' => ['required', 'string'],
      'car_registration' => ['required', 'string', 'max:255'],
      'car_model' => ['required', 'string', 'max:255'],
    ];
  }
}
