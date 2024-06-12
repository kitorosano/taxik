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
      'Paysandú',
      'Rio Negro',
      'Soriano',
      'Colonia',
      'San José',
      'Flores',
      'Florida',
      'Lavalleja',
      'Durazno',
      'Tacuarembó',
      'Montevideo'
    ];

    return [
      'name' => fake()->name(),
      'phone' => fake()->phoneNumber(),
      'address' => fake()->streetAddress(),
      'department' => Arr::random($departments),
      'linked_company_id' => null
    ];
  }
}
