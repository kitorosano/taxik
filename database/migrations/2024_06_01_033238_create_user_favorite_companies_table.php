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
    Schema::create('client_favorite_companies', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class, 'client_id')->constrained('users', 'id')->onDelete('cascade');
      $table->foreignIdFor(User::class, 'company_id')->constrained('users', 'id')->onDelete('cascade');
      $table->unique(['client_id', 'company_id']);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('client_favorite_companies');
  }
};
