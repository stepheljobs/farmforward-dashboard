<?php

namespace Database\Seeders;

use App\Models\Crop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CropSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        
        $cropNames = [
            'Tomato', 'Cucumber', 'Carrot', 'Lettuce', 'Spinach', 
            'Corn', 'Potato', 'Onion', 'Garlic', 'Broccoli', 
            'Cabbage', 'Pepper', 'Eggplant', 'Squash', 'Zucchini',
            'Radish', 'Beet', 'Kale', 'Cauliflower', 'Green Bean'
        ];
        
        $statuses = ['active', 'inactive'];
        
        // Create 20 crop entries
        foreach($cropNames as $index => $name) {
            Crop::create([
                'name' => $name,
                'variety' => $faker->randomElement([null, 'Organic', 'Heirloom', 'Hybrid', 'GMO-free']),
                'sku' => 'CRP' . str_pad($index + 1, 3, '0', STR_PAD_LEFT),
                'status' => $faker->randomElement($statuses),
            ]);
        }
    }
} 