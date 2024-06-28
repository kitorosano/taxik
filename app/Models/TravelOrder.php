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
    'assigned_taxi_id',
    'origin',
    'destination',
    'departure_date',
    'price',
    'payment_method',
    'status',
    'estimated_arrival_date',
  ];

  protected $appends = [
    'clientName',
    'companyName',
    'statusString',
    'paymentMethodString',
  ];

  public static $STATUS_CODES = [
    'Pendiente' => 0,
    'Aprobado' => 1,
    'En Viaje' => 2,
    'Completado' => 3,
    'Cancelado' => 4,
  ];

  public static $STATUS_STRINGS = [
    0 => 'Pendiente',
    1 => 'Aprobado',
    2 => 'En Viaje',
    3 => 'Completado',
    4 => 'Cancelado',
  ];

  public static $PAYMENT_METHOD_CODES = [
    'Efectivo' => 0,
    'Tarjeta' => 1,
    'Mercado Pago' => 2,
  ];

  public static $PAYMENT_METHOD_STRINGS = [
    0 => 'Efectivo',
    1 => 'Tarjeta',
    2 => 'Mercado Pago',
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

  public function assignedTaxi(): BelongsTo
  {
    return $this->belongsTo(Taxi::class, 'assigned_taxi_id');
  }

  protected function getClientNameAttribute(): string
  {
    return $this->client->name;
  }

  protected function getCompanyNameAttribute(): string
  {
    return $this->company->name;
  }

  protected function getStatusStringAttribute(): string
  {
    return self::$STATUS_STRINGS[$this->status];
  }

  protected function getPaymentMethodStringAttribute(): string
  {
    return self::$PAYMENT_METHOD_STRINGS[$this->payment_method];
  }
}
