<?php

namespace Database\Seeders;

use App\Models\CropPlanner;
use App\Models\Farmer;
use App\Models\User;
use App\Models\CropType;
use Illuminate\Database\Seeder;

class CropPlannerSeeder extends Seeder
{
    public function run(): void
    {
        // Check if we have the required related records
        if (Farmer::count() === 0) {
            $this->command->info('No farmers found. Please run FarmerSeeder first.');
            return;
        }

        if (User::count() === 0) {
            $this->command->info('No users found. Please create some users first.');
            return;
        }

        if (CropType::count() === 0) {
            $this->command->info('No crop types found. Please run CropTypeSeeder first.');
            return;
        }

        // Create 10 crop planning records instead of 50
        CropPlanner::factory()->count(10)->create();
        
        $this->command->info('Created 10 crop planning records.');
    }
} 