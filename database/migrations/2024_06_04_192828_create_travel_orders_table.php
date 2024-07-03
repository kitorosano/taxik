<?php

use App\Models\Taxi;
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
      $table->foreignIdFor(User::class, 'client_id')->constrained('users', 'id');
      $table->foreignIdFor(User::class, 'company_id')->nullable()->constrained('users', 'id')->nullOnDelete();
      $table->foreignIdFor(Taxi::class, 'assigned_taxi_id')->nullable()->constrained('taxis', 'id')->nullOnDelete();
      $table->string('origin');
      $table->string('destination');
      $table->dateTime('departure_date');
      $table->float('price');
      $table->integer('payment_method')->default(0); // 0 - Cash | 1 - Card | 2 - Mercado Pago
      $table->integer('status')->default(0); // 1 - Pending | 2 - Approved | 3 - Rejected | 4 - Completed | 5 - Canceled
      $table->dateTime('estimated_arrival_date');
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
