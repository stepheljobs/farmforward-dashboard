<?php

namespace Database\Factories;

use App\Models\CropCommitment;
use App\Models\Farmer;
use App\Models\CropType;
use Illuminate\Database\Eloquent\Factories\Factory;

class CropCommitmentFactory extends Factory
{
    protected $model = CropCommitment::class;

    public function definition(): array
    {
        return [
            'farmer_id' => Farmer::inRandomOrder()->first()->id,
            'crop_type_id' => CropType::inRandomOrder()->first()->id,
            'estimated_quantity' => $this->faker->numberBetween(100, 1000),
            'expected_harvest_date' => $this->faker->dateTimeBetween('now', '+2 months'),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'fulfilled', 'failed']),
        ];
    }
} 