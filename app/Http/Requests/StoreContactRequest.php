<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'string', 'max:255'],
      'address' => ['required', 'string', 'max:255'],
      'department' => ['required', 'string', 'max:255'],
      'linked_company_id' => ['sometimes', 'nullable', 'int', 'exists:users,id'],
    ];
  }
}
