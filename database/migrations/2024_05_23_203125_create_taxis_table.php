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
    Schema::create('taxis', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class, 'company_id')->constrained('users', 'id');
      $table->string('driver_name');
      $table->longText('driver_picture');
      $table->string('car_registration'); //matricula
      $table->string('car_model');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('taxis');
  }
};
