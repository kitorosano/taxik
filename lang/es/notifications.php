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

  'client-favorite-company-create' => 'Has agregado a :company a tus favoritos!',
  'client-favorite-company-delete' => 'Has eliminado a :company de tus favoritos!',
  'client-favorite-company-already-exist' => ':company ya existe en tus favoritos!',
  'client-favorite-company-doesnt-exist' => ':company no existe en tus favoritos!',

  'contact-create' => [
    'company' => 'Tu contacto ha sido creado exitosamente!',
    'admin' => 'Has creado el contacto ":contact"'
  ],
  'contact-validate' => 'Has validado el contacto ":contact"! Ahora está disponible para los clientes',
  'contact-update' => [
    'company' => 'Has actualizado tu contacto!',
    'admin' => 'Has actualizado el contacto ":contact"'
  ],
  'contact-delete' => 'Has eliminado el contacto ":contact"',
  'contact-delete-error' => 'No puedes eliminar este contacto porque está vinculado a la empresa ":company"',

  'language-changed' => 'Idioma cambiado a :lang!',

  'profile-update' => 'Tu perfil ha sido actualizado exitosamente!',

  'taxi-create' => 'El taxi de :driver, matricula :registration, ha sido creado exitosamente!',
  'taxi-update' => 'El taxi de :driver, matricula :registration, ha sido actualizado exitosamente!',
  'taxi-delete' => 'El taxi de :driver, matricula :registration, ha sido eliminado exitosamente!',

  'travel-order-client-create' => 'Tu pedido de viaje ha sido creado exitosamente!',
  'travel-order-company-update' => 'Has actualizado la orden de viaje #:id para :client!',

  'user-login' => 'Bienvenido :user!',
  'user-password-update' => 'Tu contraseña ha sido actualizada exitosamente!',

  'user-update' => 'Has actualizado al usuario :user!',
  'user-delete' => 'Has eliminado al usuario :user!',


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
      'title' => 'Reserva de viaje actualizada',
      'message' => 'El estado de tu pedido #:id ha sido actualizado a :status.'
    ],
    'company' => [
      'title' => 'Nueva solicitud de viaje!',
      'message' => 'Tienes un nuevo pedido de viaje #:id de :client.'
    ]
  ]

];
