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
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone_number' => $this->faker->phoneNumber(),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'province' => $this->faker->state(),
            'postal_code' => $this->faker->postcode(),
            'farm_description' => $this->faker->paragraph(),
            'farm_size_hectares' => $this->faker->randomFloat(2, 1, 100),
            'status' => $this->faker->randomElement(['active', 'inactive', 'pending']),
            'registration_date' => Carbon::now()->subDays(rand(1, 365)),
            'membership_renewal_date' => Carbon::now()->addDays(rand(1, 365)),
            'profile_image' => null,
        ];
    }
} 