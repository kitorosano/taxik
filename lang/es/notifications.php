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

  'client-favorite-company-create' => 'Has agregado a :company a tus favoritos!',
  'client-favorite-company-delete' => 'Has eliminado a :company de tus favoritos!',
  'client-favorite-company-already-exist' => ':company ya existe en tus favoritos!',
  'client-favorite-company-doesnt-exist' => ':company no existe en tus favoritos!',

  'user-login' => 'Bienvenido :user!',
  'user-password-update' => 'Tu contraseña ha sido actualizada exitosamente!',

  'profile-update' => 'Tu perfil ha sido actualizado exitosamente!',

  'travel-order-create' => 'Tu pedido de viaje ha sido creado exitosamente!',

  'travel-order-update' => [
    'client' => [
      'title' => 'Reserva de viaje actualizada',
      'message' => 'El estado de tu pedido #:id ha sido actualizado a :status.'
    ],
    'company' => [
      'title' => 'Nueva solicitud de viaje!',
      'message' => 'Tienes un nuevo pedido de viaje #:id de :client.'
    ]
  ]

];
