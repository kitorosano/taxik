<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

  public function company()
  {
    return $this->belongsTo(User::class, 'linked_company_id');
  }
}
