<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (!User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
            ]);
        }

        $this->call([
            CropTypeSeeder::class,
            CropSeeder::class,
            FarmerSeeder::class,
            FarmSeeder::class,
            CropArrivalSeeder::class,
            SalesInvoiceSeeder::class,
            CropCommitmentSeeder::class,
            SaleSeeder::class,
            BuyerSeeder::class,
        ]);
    }
}
