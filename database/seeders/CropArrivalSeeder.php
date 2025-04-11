<?php

namespace Database\Seeders;

use App\Models\CropArrival;
use App\Models\Farmer;
use App\Models\Farm;
use App\Models\CropType;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CropArrivalSeeder extends Seeder
{
    public function run(): void
    {
        CropArrival::factory()
            ->count(50)
            ->create();
    }
} 