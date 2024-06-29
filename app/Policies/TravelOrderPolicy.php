<?php

namespace App\Policies;

use App\Models\TravelOrder;
use App\Models\User;

class TravelOrderPolicy
{
  /**
   * Determine whether the user can view any models.
   */
  public function viewAny(User $user): bool
  {
    return !$user->isAdmin;
  }

  /**
   * Determine whether the user can view the model.
   */
  public function view(User $user, TravelOrder $travelOrder): bool
  {
    return false;
  }

  /**
   * Determine whether the user can create models.
   */
  public function create(User $user): bool
  {
    return $user->isClient;
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user, TravelOrder $travelOrder): bool
  {
    return $user->id === $travelOrder->company_id;
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(User $user, TravelOrder $travelOrder): bool
  {
    return false;
  }

  /**
   * Determine whether the user can restore the model.
   */
  public function restore(User $user, TravelOrder $travelOrder): bool
  {
    return false;
  }

  /**
   * Determine whether the user can permanently delete the model.
   */
  public function forceDelete(User $user, TravelOrder $travelOrder): bool
  {
    return false;
  }
}
