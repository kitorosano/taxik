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
    Schema::create('notifications', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->constrained('users', 'id')->onDelete('cascade');
      $table->string('title');
      $table->text('description');
      $table->boolean('watched')->default(false);
      $table->unsignedBigInteger('reference_id')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('notifications');
  }
};
