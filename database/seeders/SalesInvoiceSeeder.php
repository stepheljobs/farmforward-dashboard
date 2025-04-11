<?php

namespace Database\Seeders;

use App\Models\SalesInvoice;
use Illuminate\Database\Seeder;

class SalesInvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 sales invoices with their items
        SalesInvoice::factory()
            ->count(10)
            ->create();
    }
} 