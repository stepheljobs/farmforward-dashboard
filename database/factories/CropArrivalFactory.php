<?php

namespace Database\Factories;

use App\Models\CropArrival;
use App\Models\Farmer;
use App\Models\Farm;
use App\Models\CropType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CropArrival>
 */
class CropArrivalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'stub_no' => 'STUB-' . str_pad($this->faker->unique()->numberBetween(1, 99999), 5, '0', STR_PAD_LEFT),
            'received_date' => Carbon::now()->subDays(rand(1, 30)),
            'farmer_id' => Farmer::factory(),
            'field_id' => Farm::factory(),
            'crop_type_id' => CropType::inRandomOrder()->first()->id,
            'quantity_good' => $this->faker->randomFloat(1, 100, 1000),
            'quantity_semi' => $this->faker->randomFloat(1, 10, 100),
            'quantity_reject' => $this->faker->randomFloat(1, 1, 50),
            'receipt_id' => 'REC-' . str_pad($this->faker->unique()->numberBetween(1, 99999), 5, '0', STR_PAD_LEFT),
            'receipt_name' => 'Receipt ' . $this->faker->numberBetween(1, 99999),
        ];
    }
} 