<?php

namespace Database\Factories;

use App\Models\SalesInvoice;
use App\Models\Buyer;
use Illuminate\Database\Eloquent\Factories\Factory;

class SalesInvoiceFactory extends Factory
{
    protected $model = SalesInvoice::class;

    public function definition(): array
    {
        return [
            'invoice_number' => 'SI-' . date('Ymd') . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'buyer_id' => Buyer::factory(),
            'subtotal' => $this->faker->randomFloat(2, 100, 10000),
            'tax' => $this->faker->randomFloat(2, 10, 1000),
            'total_amount' => function (array $attributes) {
                return $attributes['subtotal'] + $attributes['tax'];
            },
            'status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'payment_status' => $this->faker->randomElement(['pending', 'partial', 'paid']),
        ];
    }
} 