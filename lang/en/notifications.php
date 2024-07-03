<?php

return [

  /*
    |--------------------------------------------------------------------------
    | Notifications Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used by the notification library to build
    | the simple notification messages. You are free to change them to anything
    | you want to customize your views to better match your application.
    |
    */

  'client-favorite-company-create' => 'The company :company has been added to your favorites!',
  'client-favorite-company-delete' => 'The company :company has been removed from your favorites!',
  'client-favorite-company-already-exist' => 'The company :company already exists in your favorites!',
  'client-favorite-company-doesnt-exist' => 'The company :company does not exist in your favorites!',

  'user-login' => 'Welcome :user!',
  'user-password-update' => 'Your password has been updated successfully!',

  'profile-update' => 'Your profile has been updated successfully!',

  'travel-order-create' => 'Your travel order has been created successfully!',

  'travel-order-update' => [
    'client' => [
      'title' => 'Update on your travel order',
      'message' => 'The status of your travel order #:id has been updated to :status.'
    ],
    'company' => [
      'title' => 'New travel order request!',
      'message' => 'You have a new travel order #:id from :client.'
    ]
  ]

];
