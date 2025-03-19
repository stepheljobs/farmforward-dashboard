<?php

namespace Database\Seeders;

use App\Models\Farm;
use Illuminate\Database\Seeder;

class FarmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $farms = [
            [
                'farmer_id' => 1, // You'll need to ensure farmer IDs exist
                'name' => 'Green Valley Farm',
                'location' => 'Batangas City, Batangas',
                'size_hectares' => 5.5,
                'soil_type' => 'Clay Loam',
                'water_source' => 'Natural Spring',
                'description' => 'A sustainable farm with rich soil and natural irrigation',
            ],
            [
                'farmer_id' => 2,
                'name' => 'Sunshine Fields',
                'location' => 'San Pablo, Laguna',
                'size_hectares' => 3.2,
                'soil_type' => 'Sandy Loam',
                'water_source' => 'Deep Well',
                'description' => 'Family-owned farm specializing in organic vegetables',
            ],
            [
                'farmer_id' => 3,
                'name' => 'Mountain View Farm',
                'location' => 'Tagaytay, Cavite',
                'size_hectares' => 4.8,
                'soil_type' => 'Volcanic Soil',
                'water_source' => 'River',
                'description' => 'High-altitude farm with cool climate crops',
            ],
            [
                'farmer_id' => 4,
                'name' => 'River Side Agriculture',
                'location' => 'Calamba, Laguna',
                'size_hectares' => 6.7,
                'soil_type' => 'Alluvial Soil',
                'water_source' => 'River Irrigation',
                'description' => 'Riverside farm with excellent irrigation system',
            ],
            [
                'farmer_id' => 5,
                'name' => 'Golden Harvest Fields',
                'location' => 'Lipa City, Batangas',
                'size_hectares' => 4.2,
                'soil_type' => 'Loamy Soil',
                'water_source' => 'Rainwater Collection',
                'description' => 'Modern farm implementing sustainable practices',
            ],
            [
                'farmer_id' => 6,
                'name' => 'Fresh Morning Farm',
                'location' => 'Silang, Cavite',
                'size_hectares' => 3.8,
                'soil_type' => 'Sandy Clay',
                'water_source' => 'Municipal Water',
                'description' => 'Small-scale farm focusing on high-value crops',
            ],
            [
                'farmer_id' => 7,
                'name' => 'Paradise Valley Farm',
                'location' => 'Tanauan, Batangas',
                'size_hectares' => 5.1,
                'soil_type' => 'Black Soil',
                'water_source' => 'Lake Irrigation',
                'description' => 'Diverse crop farm with integrated farming system',
            ],
            [
                'farmer_id' => 8,
                'name' => 'Eco Friendly Farm',
                'location' => 'Alfonso, Cavite',
                'size_hectares' => 2.9,
                'soil_type' => 'Red Soil',
                'water_source' => 'Natural Spring',
                'description' => 'Eco-friendly farm practicing organic farming',
            ],
            [
                'farmer_id' => 9,
                'name' => 'Highland Agriculture',
                'location' => 'Laurel, Batangas',
                'size_hectares' => 4.5,
                'soil_type' => 'Mountain Soil',
                'water_source' => 'Spring and Rain',
                'description' => 'Highland farm with terraced cultivation',
            ],
            [
                'farmer_id' => 10,
                'name' => 'Fertile Plains Farm',
                'location' => 'Santa Rosa, Laguna',
                'size_hectares' => 7.3,
                'soil_type' => 'Silt Loam',
                'water_source' => 'Irrigation Canal',
                'description' => 'Large-scale farm with modern farming techniques',
            ],
        ];

        foreach ($farms as $farm) {
            Farm::create($farm);
        }
    }
} 