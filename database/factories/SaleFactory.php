<?php

namespace Database\Factories;

use App\Models\Sale;
use App\Models\SalesInvoice;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    protected $model = Sale::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sales_number' => 'SL-' . date('Ymd') . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'sales_invoice_id' => SalesInvoice::factory(),
            'finalized_by' => User::factory(),
            'final_amount' => function (array $attributes) {
                return SalesInvoice::find($attributes['sales_invoice_id'])->total_amount;
            },
            'status' => 'completed',
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
