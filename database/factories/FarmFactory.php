<?php

namespace Database\Factories;

use App\Models\Farm;
use App\Models\Farmer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Farm>
 */
class FarmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'farmer_id' => Farmer::factory(),
            'name' => $this->faker->company() . ' Farm',
            'location' => $this->faker->city() . ', ' . $this->faker->state(),
            'size_hectares' => $this->faker->randomFloat(2, 1, 100),
            'soil_type' => $this->faker->randomElement(['Clay Loam', 'Sandy Loam', 'Volcanic Soil', 'Alluvial Soil', 'Black Soil', 'Red Soil', 'Mountain Soil', 'Silt Loam']),
            'water_source' => $this->faker->randomElement(['Natural Spring', 'Deep Well', 'River', 'River Irrigation', 'Rainwater Collection', 'Municipal Water', 'Lake Irrigation', 'Spring and Rain', 'Irrigation Canal']),
            'description' => $this->faker->paragraph(),
        ];
    }
} 