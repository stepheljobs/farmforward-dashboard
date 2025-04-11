<?php

namespace Database\Factories;

use App\Models\CropType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CropType>
 */
class CropTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $crops = [
            'Tomatoes', 'Carrots', 'Lettuce', 'Potatoes', 'Bell Peppers',
            'Cucumbers', 'Green Beans', 'Onions', 'Zucchini', 'Sweet Corn',
            'Eggplant', 'Broccoli', 'Cauliflower', 'Spinach', 'Kale',
            'Radishes', 'Beets', 'Peas', 'Squash', 'Pumpkins'
        ];

        $seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'Spring, Fall', 'Summer, Fall'];

        return [
            'name' => $this->faker->unique()->randomElement($crops),
            'description' => $this->faker->sentence(),
            'season' => $this->faker->randomElement($seasons),
            'growing_period_days' => $this->faker->numberBetween(30, 120),
            'price_per_kg' => $this->faker->randomFloat(2, 1, 5),
            'is_active' => $this->faker->boolean(90), // 90% chance of being active
        ];
    }
} 