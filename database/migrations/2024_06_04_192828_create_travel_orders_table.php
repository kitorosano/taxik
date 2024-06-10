<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('travel_orders', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class, 'client_id')->nullable()->constrained('users', 'id');
      $table->foreignIdFor(User::class, 'company_id')->nullable()->constrained('users', 'id');
      $table->string('origin');
      $table->string('destination');
      $table->dateTime('departure_date');
      $table->float('price');
      $table->string('status')->default('pending');
      $table->dateTime('estimated_arrival_date')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('travel_orders');
  }
};
