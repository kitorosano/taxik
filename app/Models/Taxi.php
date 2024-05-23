<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taxi extends Model
{
  use HasFactory;


  protected $fillable = [
    'company_id',
    'code',
    'is_available',
  ];

  public function company()
  {
    return $this->belongsTo(User::class, 'company_id');
  }
}
