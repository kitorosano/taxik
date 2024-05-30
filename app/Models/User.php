<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'type',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
    'type'
  ];

  protected $appends = [
    'isAdmin',
    'isClient',
    'isCompany',
    'typeString'
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function contact(): HasOne
  {
    return $this->hasOne(Contact::class, 'linked_company_id');
  }

  protected function getIsAdminAttribute(): bool
  {
    return $this->type === 0;
  }

  protected function getIsClientAttribute(): bool
  {
    return $this->type === 1;
  }

  protected function getIsCompanyAttribute(): bool
  {
    return $this->type === 2;
  }

  protected function getTypeStringAttribute(): string
  {
    return match ($this->type) {
      0 => 'Administrador',
      1 => 'Cliente',
      2 => 'Compania',
      default => 'Unknown',
    };
  }
}
