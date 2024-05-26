<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
  use HasFactory;


  protected $fillable = [
    'name',
    'phone',
    'address',
    'department',
    'linked_company_id',
  ];

  protected $appends = [
    'companyName',
  ];

  public function linkedCompany(): BelongsTo
  {
    return $this->belongsTo(User::class, "linked_company_id");
  }

  public function getCompanyNameAttribute(): string
  {
    return $this->linkedCompany->name ?? '';
  }
}
