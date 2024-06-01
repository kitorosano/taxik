<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ClientFavoriteCompany extends Pivot
{

  protected $fillable = [
    'id', 
    'client_id',
    'company_id',
  ];

  public function client(): BelongsTo
  {
    return $this->belongsTo(User::class, 'client_id');
  }

  public function company(): BelongsTo
  {
    return $this->belongsTo(User::class, 'company_id');
  }
}
