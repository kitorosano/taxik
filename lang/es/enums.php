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
      'client' => 'Cliente',
      'company' => 'Empresa',
      'admin' => 'Administrador',
      'unknown' => 'Desconocido',
    ]
  ],

  'travel-order' => [
    'status' => [
      'pending' => 'Pendiente',
      'approved' => 'Aprobado',
      'on-trip' => 'En Viaje',
      'completed' => 'Completado',
      'canceled' => 'Cancelado',
    ],
    'payment-method' => [
      'cash' => 'Efectivo',
      'card' => 'Tarjeta',
      'mercadopago' => 'Mercado Pago',
    ]
  ]

];
