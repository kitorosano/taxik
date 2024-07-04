<?php

namespace App\Models;

use DateTimeZone;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

use function PHPUnit\Framework\isNull;

class Taxi extends Model
{
  use HasFactory;


  protected $fillable = [
    'company_id',
    'driver_name',
    'driver_picture',
    'car_registration',
    'car_model',
  ];

  protected $appends = [
    'companyName',
    'isAvailableNow'
  ];


  public function company(): BelongsTo
  {
    return $this->belongsTo(User::class, 'company_id');
  }

  public function getCompanyNameAttribute(): string
  {
    return $this->linkedCompany->name ?? '';
  }

  public function getIsAvailableNowAttribute(): bool
  {
    $isOccuped = $this->hasMany(TravelOrder::class, 'assigned_taxi_id')
      ->whereIn('status', [1, 2])
      ->where('departure_date', '<=', now(new DateTimeZone("America/Montevideo")))
      ->where('estimated_arrival_date', '>', now(new DateTimeZone("America/Montevideo")))
      ->exists();

    if ($isOccuped) {
      return false;
    }

    return true;
  }
}
