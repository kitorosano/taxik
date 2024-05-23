<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // $this->userSeeds();
    $this->contactSeeds();
  }

  protected function userSeeds(): void
  {
    // User::factory(10)->create();
    // Create admin user
    User::factory()->create([
      'name' => 'Test Admin',
      'email' => 'admin@example.com',
      'password' => '12345678',
      'type' => 0
    ]);
    // Create client user
    User::factory()->create([
      'name' => 'Test Client',
      'email' => 'client@example.com',
      'password' => '12345678',
      'type' => 1
    ]);
    // Create company user
    User::factory()->create([
      'name' => 'Test Company',
      'email' => 'company@example.com',
      'password' => '12345678',
      'type' => 2
    ]);
  }

  protected function contactSeeds(): void
  {
    Contact::factory(50)->create();
  }
}
