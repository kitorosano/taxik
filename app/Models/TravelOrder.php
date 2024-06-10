<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TravelOrder extends Model
{
  use HasFactory;

  protected $fillable = [
    'client_id',
    'company_id',
    'origin',
    'destination',
    'departure_date',
    'price',
    'status',
    'estimated_arrival_date',
  ];

  protected $appends = [
    'companyName',
    'statusString'
  ];

  protected function casts(): array
  {
    return [
      'departure_date' => 'datetime',
      'estimated_arrival_date' => 'datetime',
    ];
  }

  public function client(): BelongsTo
  {
    return $this->belongsTo(User::class, 'client_id');
  }

  public function company(): BelongsTo
  {
    return $this->belongsTo(User::class, 'company_id');
  }

  protected function getStatusStringAttribute(): string
  {
    $statuses = [
      1 => 'Pendiente',
      2 => 'Aprobado',
      3 => 'Rechazado',
      4 => 'Completado',
      5 => 'Cancelado',
    ];

    return $statuses[$this->status];
  }

  protected function getCompanyNameAttribute(): string
  {
    return $this->company->name;
  }
}
