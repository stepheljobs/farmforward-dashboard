<?php

namespace Database\Seeders;

use App\Models\CropType;
use Illuminate\Database\Seeder;

class CropTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $crops = [
            [
                'name' => 'Tomatoes',
                'description' => 'Fresh, juicy tomatoes perfect for salads and cooking',
                'season' => 'Summer',
                'growing_period_days' => 90,
                'price_per_kg' => 2.50,
                'is_active' => true,
            ],
            [
                'name' => 'Carrots',
                'description' => 'Sweet and crunchy orange carrots',
                'season' => 'Spring, Fall',
                'growing_period_days' => 70,
                'price_per_kg' => 1.80,
                'is_active' => true,
            ],
            [
                'name' => 'Lettuce',
                'description' => 'Fresh, crisp lettuce for salads',
                'season' => 'Spring, Fall',
                'growing_period_days' => 45,
                'price_per_kg' => 3.20,
                'is_active' => true,
            ],
            [
                'name' => 'Potatoes',
                'description' => 'Versatile potatoes suitable for various dishes',
                'season' => 'Spring, Summer',
                'growing_period_days' => 120,
                'price_per_kg' => 1.50,
                'is_active' => true,
            ],
            [
                'name' => 'Bell Peppers',
                'description' => 'Colorful bell peppers in various colors',
                'season' => 'Summer',
                'growing_period_days' => 75,
                'price_per_kg' => 3.00,
                'is_active' => true,
            ],
            [
                'name' => 'Cucumbers',
                'description' => 'Fresh, crisp cucumbers perfect for salads',
                'season' => 'Summer',
                'growing_period_days' => 60,
                'price_per_kg' => 2.00,
                'is_active' => true,
            ],
            [
                'name' => 'Green Beans',
                'description' => 'Tender green beans for various dishes',
                'season' => 'Summer',
                'growing_period_days' => 55,
                'price_per_kg' => 2.80,
                'is_active' => true,
            ],
            [
                'name' => 'Onions',
                'description' => 'Versatile onions for cooking',
                'season' => 'Spring, Summer',
                'growing_period_days' => 100,
                'price_per_kg' => 1.20,
                'is_active' => true,
            ],
            [
                'name' => 'Zucchini',
                'description' => 'Fresh zucchini for grilling and cooking',
                'season' => 'Summer',
                'growing_period_days' => 50,
                'price_per_kg' => 2.20,
                'is_active' => true,
            ],
            [
                'name' => 'Sweet Corn',
                'description' => 'Sweet and tender corn on the cob',
                'season' => 'Summer',
                'growing_period_days' => 85,
                'price_per_kg' => 2.50,
                'is_active' => true,
            ],
        ];

        foreach ($crops as $crop) {
            CropType::create($crop);
        }
    }
} 