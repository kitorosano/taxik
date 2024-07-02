<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */


  public function definition(): array
  {

    return [
      'user_id' => fake()->numberBetween(1, 10),
      'title' => fake()->sentence(),
      'description' => fake()->paragraph(),
      'watched' => false,
    ];
  }
}
