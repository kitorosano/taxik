<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Taxi>
 */
class TaxiFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */


  public function definition(): array
  {
    $models = [
      'Toyota',
      'Nissan',
      'Chevrolet',
      'Ford',
      'Hyundai',
      'Kia',
      'Volkswagen',
      'Renault',
      'Mercedes Benz',
      'BMW',
      'Audi',
      'Mazda',
      'Subaru',
      'Honda',
      'Suzuki',
      'Peugeot',
      'Citroen',
      'Fiat',
      'Jeep',
      'Land Rover',
      'Volvo',
      'Jaguar',
      'Porsche',
      'Lexus',
      'Infiniti',
      'Acura',
      'Lincoln',
      'Buick',
      'Cadillac',
      'GMC',
      'Chrysler',
      'Dodge',
      'Ram',
      'Tesla',
      'Mini',
      'Smart',
      'Mitsubishi',
      'Seat',
      'Skoda',
      'Alfa Romeo',
      'Lancia',
      'Dacia',
      'SsangYong',
      'Mahindra',
      'Tata',
      'Isuzu',
      'Great Wall',
      'Chery',
      'Geely',
      'BYD',
      'Changan',
      'Haval',
      'JAC',
      'Foton',
      'Dongfeng',
      'BAIC',
      'Zotye',
      'Brilliance',
      'Changhe',
      'Haima',
      'Soueast',
      'Lifan',
      'JMC',
      'Hafei',
      'Landwind',
      'Wuling',
      'Chana',
      'Jinbei',
      'Huanghai',
      'Hawtai',
      'Yema',
      'ZX Auto',
      'Yutong',
      'King Long',
      'Golden Dragon',
      'Zhongtong',
      'Ankai',
      'Sunlong',
      'Youngman',
      'Higer',
      'Foton',
      'Dongfeng',
      'BAIC',
      'Zotye',
      'Brilliance',
      'Changhe',
      'Haima',
      'Soueast',
      'Lifan',
      'JMC',
      'Hafei',
      'Landwind',
      'Wuling',
      'Chana',
    ];

    return [
      'company_id' => null,
      'driver_name' => fake()->name(),
      'driver_picture' => 'https://randomuser.me/api/portraits/men/' . random_int(1, 99) . '.jpg',
      'car_registration' => fake()->regexify('[A-Z]{3}[0-9]{4}'),
      'car_model' => Arr::random($models),
    ];
  }
}
