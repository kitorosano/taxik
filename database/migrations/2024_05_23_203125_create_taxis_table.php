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
      $table->string('code');
      $table->boolean('is_available')->default(true);
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
