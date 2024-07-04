<?php

return [

  /*
    |--------------------------------------------------------------------------
    | Enums Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used by model enums to build
    | the simple enum messages. You are free to change them to anything
    | you want to customize your views to better match your application.
    |
    */

  'user' => [
    'type' => [
      'client' => 'Client',
      'company' => 'Company',
      'admin' => 'Admin',
      'unknown' => 'Unknown',
    ]
  ],

  'travel-order' => [
    'status' => [
      'pending' => 'Pending',
      'approved' => 'Approved',
      'on-trip' => 'On Trip',
      'completed' => 'Completed',
      'canceled' => 'Canceled',
    ],
    'payment-method' => [
      'cash' => 'Cash',
      'card' => 'Card',
      'mercadopago' => 'Mercado Pago',
    ]
  ]

];
