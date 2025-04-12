<?php

namespace Database\Factories;

use App\Models\CropPlanner;
use App\Models\Farmer;
use App\Models\User;
use App\Models\CropType;
use Illuminate\Database\Eloquent\Factories\Factory;

class CropPlannerFactory extends Factory
{
    protected $model = CropPlanner::class;

    public function definition(): array
    {
        return [
            'farmer_id' => Farmer::inRandomOrder()->first()->id,
            'consultant_id' => User::inRandomOrder()->first()->id,
            'crop_type_id' => CropType::inRandomOrder()->first()->id,
            'planned_area_hectares' => $this->faker->randomFloat(2, 0.5, 10),
            'estimated_quantity' => $this->faker->randomFloat(2, 100, 10000),
            'planned_planting_date' => $this->faker->dateTimeBetween('now', '+3 months'),
            'expected_harvest_date' => $this->faker->dateTimeBetween('+4 months', '+8 months'),
            'consultant_notes' => $this->faker->paragraph,
            'farmer_notes' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['draft', 'pending_consultant', 'pending_farmer', 'approved', 'rejected']),
            'consultant_requested_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'farmer_responded_at' => $this->faker->optional(0.7)->dateTimeBetween('-1 month', 'now'),
            'location' => $this->faker->city,
            'variety' => $this->faker->word,
            'volume_inputs' => $this->faker->randomFloat(2, 10, 1000),
            'volume_inputs_type' => $this->faker->randomElement(['can', 'plants', 'lata', 'kg', 'seeds', 'g']),
            'contact_number' => $this->faker->phoneNumber,
        ];
    }
} 