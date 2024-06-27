<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
  ];


  public function company(): BelongsTo
  {
    return $this->belongsTo(User::class, 'company_id');
  }

  public function getCompanyNameAttribute(): string
  {
    return $this->linkedCompany->name ?? '';
  }
}
