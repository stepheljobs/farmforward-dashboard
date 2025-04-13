<?php

namespace Database\Factories;

use App\Models\SalesInvoice;
use App\Models\CropArrival;
use Illuminate\Database\Eloquent\Factories\Factory;

class SalesInvoiceFactory extends Factory
{
    protected $model = SalesInvoice::class;

    public function definition(): array
    {
        return [
            'invoice_number' => 'SI-' . date('Ymd') . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'subtotal' => $this->faker->randomFloat(2, 100, 10000),
            'tax' => $this->faker->randomFloat(2, 10, 1000),
            'total_amount' => function (array $attributes) {
                return $attributes['subtotal'] + $attributes['tax'];
            },
            'status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'payment_status' => $this->faker->randomElement(['pending', 'partial', 'paid']),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (SalesInvoice $salesInvoice) {
            $cropArrivals = CropArrival::inRandomOrder()
                ->take($this->faker->numberBetween(1, 3))
                ->get();

            foreach ($cropArrivals as $cropArrival) {
                $quantity = 1;  
                $unitPrice = $this->faker->randomFloat(2, 10, 100);

                $salesInvoice->items()->create([
                    'crop_arrival_stub' => $cropArrival->stub_no,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'total_price' => $quantity * $unitPrice,
                    'crop_type' => $cropArrival->cropType->name,
                    'notes' => $this->faker->optional()->sentence(),
                ]);
            }
        });
    }
} 