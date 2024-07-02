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
    'pending' => 0,
    'approved' => 1,
    'on-trip' => 2,
    'completed' => 3,
    'canceled' => 4,
  ];

  public static $STATUS_STRINGS = [
    0 => 'pending',
    1 => 'approved',
    2 => 'on-trip',
    3 => 'completed',
    4 => 'canceled',
  ];

  public static $PAYMENT_METHOD_CODES = [
    'cash' => 0,
    'card' => 1,
    'mercadopago' => 2,
  ];

  public static $PAYMENT_METHOD_STRINGS = [
    0 => 'cash',
    1 => 'card',
    2 => 'mercadopago',
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
    return trans('enums.travel-order.status.' . self::$STATUS_STRINGS[$this->status]);
  }

  protected function getPaymentMethodStringAttribute(): string
  {
    return trans('enums.travel-order.payment-method.' . self::$PAYMENT_METHOD_STRINGS[$this->payment_method]);
  }
}
