<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */


  public function definition(): array
  {

    $departments = [
      'Canelones',
      'Maldonado',
      'Rocha',
      'Treinta y Tres',
      'Cerro Largo',
      'Rivera',
      'Artigas',
      'Salto',
      'Paysandu',
      'Rio Negro',
      'Soriano',
      'Colonia',
      'San Jose',
      'Flores',
      'Florida',
      'Lavalleja',
      'Durazno',
      'Tacuarembo',
      'Montevideo'
    ];

    return [
      'name' => fake()->name(),
      'phone' => fake()->phoneNumber(),
      'address' => Arr::random($departments),
      'linked_company_id' => null
    ];
  }
}
