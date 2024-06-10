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
      0 => 'Pending',
      1 => 'Approved',
      2 => 'Rejected',
      3 => 'Cancelled',
      4 => 'Completed',
    ];

    return $statuses[$this->status];
  }
}
