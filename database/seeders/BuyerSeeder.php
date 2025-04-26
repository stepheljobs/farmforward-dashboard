<?php

namespace Database\Seeders;

use App\Models\Buyer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BuyerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        
        $statuses = ['Active', 'Inactive', 'Pending'];
        $destinations = ['Local', 'Regional', 'National', 'International', 'Direct Consumer'];
        
        // Create 20 individual buyers with Filipino names and addresses
        for ($i = 0; $i < 20; $i++) {
            $firstName = $faker->firstName;
            $lastName = $faker->lastName;
            $nickname = $faker->randomElement([null, Str::substr($firstName, 0, 3) . 'y', 'Kuya ' . Str::substr($firstName, 0, 1)]);
            
            Buyer::create([
                'nickname' => $nickname,
                'last_name' => $lastName,
                'first_name' => $firstName,
                'middle_initial' => $faker->randomElement([null, chr(rand(65, 90))]), // Random letter A-Z
                'buyer_id' => 'BUY' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                'birthdate' => $faker->dateTimeBetween('-60 years', '-18 years'),
                'email' => $faker->optional(0.7)->safeEmail,
                'phone_number' => $faker->phoneNumber(),
                'sitio_purok_subdivision' => $faker->randomElement([null, 'Purok ' . rand(1, 10), 'Sitio ' . $faker->word(), $faker->streetName() . ' Subdivision']),
                'barangay' => 'Barangay ' . $faker->word(),
                'city_municipality' => $faker->city(),
                'province' => $faker->randomElement(['Batangas', 'Laguna', 'Cavite', 'Rizal', 'Metro Manila', 'Bulacan', 'Pampanga', 'Quezon', 'Iloilo', 'Cebu']),
                'status' => $faker->randomElement($statuses),
                'destination' => $faker->randomElement($destinations),
            ]);
        }
    }
} 