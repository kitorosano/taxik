<?php

return [

  /*
    |--------------------------------------------------------------------------
    | Toast Message Notifications Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used by the notification library to build
    | the simple toast message notifications. You are free to change them to anything
    | you want to customize your views to better match your application.
    |
    */

  'client-favorite-company-create' => 'The company :company has been added to your favorites!',
  'client-favorite-company-delete' => 'The company :company has been removed from your favorites!',
  'client-favorite-company-already-exist' => 'The company :company already exists in your favorites!',
  'client-favorite-company-doesnt-exist' => 'The company :company does not exist in your favorites!',

  'contact-create' => [
    'company' => 'Your contact has been created successfully!',
    'admin' => 'You have created the contact ":contact"'
  ],
  'contact-update' => [
    'company' => 'You have updated your contact!',
    'admin' => 'You have updated the contact ":contact"'
  ],
  'contact-delete' => 'You have deleted the contact ":contact"',
  'contact-delete-error' => 'You cannot delete this contact because it is linked to the company ":company"',

  'language-changed' => 'Language changed to :lang!',

  'profile-update' => 'Your profile has been updated successfully!',
  
  'taxi-create' => 'The taxi of :driver, registration :registration, has been created successfully!',
  'taxi-update' => 'The taxi of :driver, registration :registration, has been updated successfully!',
  'taxi-delete' => 'The taxi of :driver, registration :registration, has been deleted successfully!',

  'travel-order-client-create' => 'Your travel order has been created successfully!',
  'travel-order-company-update' => 'You have updated the travel order #:id for :client!',

  'user-login' => 'Welcome :user!',
  'user-password-update' => 'Your password has been updated successfully!',

  'user-update' => 'You have updated the user :user!',
  'user-delete' => 'You have deleted the user :user!',

  /*
    |--------------------------------------------------------------------------
    | Bell Notification Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used by the notification library to build
    | the simple notification messages. You are free to change them to anything
    | you want to customize your views to better match your application.
    |
    */

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
