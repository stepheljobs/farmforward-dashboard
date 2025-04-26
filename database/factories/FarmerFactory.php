<?php

namespace Database\Factories;

use App\Models\Farmer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Farmer>
 */
class FarmerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'farmer_id_number' => 'FMR-' . str_pad($this->faker->unique()->numberBetween(1, 99999), 6, '0', STR_PAD_LEFT),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'middle_initial' => $this->faker->randomLetter(),
            'birthdate' => $this->faker->dateTimeBetween('-70 years', '-18 years'),
            'email' => $this->faker->unique()->safeEmail(),
            'phone_number' => $this->faker->phoneNumber(),
            'sitio_purok' => 'Purok ' . $this->faker->numberBetween(1, 10),
            'barangay' => 'Barangay ' . $this->faker->cityPrefix(),
            'city' => $this->faker->city(),
            'province' => $this->faker->state(),
            'postal_code' => $this->faker->postcode(),
            'farm_description' => $this->faker->paragraph(),
            'farm_size_hectares' => $this->faker->randomFloat(2, 1, 100),
            'farm_count' => $this->faker->numberBetween(1, 5),
            'status' => $this->faker->randomElement(['active', 'inactive', 'pending']),
            'membership_date' => Carbon::now()->subDays(rand(1, 365)),
            'membership_renewal_date' => Carbon::now()->addDays(rand(1, 365)),
            'photo' => null,
            'active_crop_commitments' => $this->faker->boolean(),
            'violations' => $this->faker->boolean(),
        ];
    }
} 