<?php

namespace Database\Seeders;

use App\Models\Buyer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BuyerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        
        // Sample company names for buyers
        $buyerNames = [
            'FreshMart Groceries', 'GreenLeaf Organics', 'Nature\'s Basket', 'Wholesome Foods', 
            'Farmers Market Co-op', 'Urban Harvest', 'Farm2Table Distributors', 'Sunrise Produce', 
            'Valley Fresh Stores', 'Eco Harvest Outlets', 'Golden Grain Wholesalers', 'Pure Foods Inc', 
            'Orchard Supply Co', 'Fresh & Clean Exports', 'Global Agri Distributors', 'Metro Greens',
            'Country Harvest Ltd', 'Food Republic Chain', 'Organica Supplies', 'Regional Food Network'
        ];
        
        $statuses = ['Active', 'Inactive', 'Pending'];
        $destinations = ['Local', 'Regional', 'National', 'International', 'Direct Consumer'];
        
        // Create buyers
        foreach($buyerNames as $index => $name) {
            Buyer::create([
                'name' => $name,
                'buyer_id' => 'BUY' . str_pad($index + 1, 3, '0', STR_PAD_LEFT),
                'phone_number' => $faker->phoneNumber(),
                'address' => $faker->address(),
                'status' => $faker->randomElement($statuses),
                'destination' => $faker->randomElement($destinations),
            ]);
        }
    }
} 