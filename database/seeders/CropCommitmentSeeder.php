<?php

namespace Database\Seeders;

use App\Models\CropCommitment;
use Illuminate\Database\Seeder;

class CropCommitmentSeeder extends Seeder
{
    public function run(): void
    {
        CropCommitment::factory()->count(20)->create();
    }
} 