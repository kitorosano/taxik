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
    $this->adminSeed();
    $this->clientSeed();
    $this->companySeed();
    $this->contactSeed();
  }

  protected function adminSeed(): void
  {
    // Create admin user
    User::factory()->create([
      'name' => 'Test Admin',
      'email' => 'admin@example.com',
      'password' => '12345678',
      'type' => 0
    ]);
  }

  protected function clientSeed(): void
  {

    // Create client user
    User::factory()->create([
      'name' => 'Test Client',
      'email' => 'client@example.com',
      'password' => '12345678',
      'type' => 1
    ]);

    User::factory(4)->create([
      'password' => '12345678',
      'type' => 1
    ]);
  }

  protected function companySeed(): void
  {
    foreach (range(1, 5) as $index) {
      // Create company user
      $company = User::factory()->create([
        'name' => 'Test Company ' . $index,
        'email' => 'company' . $index . '@example.com',
        'password' => '12345678',
        'type' => 2
      ]);
      // Create contact for company
      Contact::factory()->create([
        'name' => 'Test Company Contact ' . $index,
        'phone' => '1234567890',
        'address' => '123 Main St',
        'department' => 'Montevideo',
        'linked_company_id' => $company->id,
      ]);
    }
  }

  protected function contactSeed(): void
  {
    Contact::factory(45)->create();
  }
}
