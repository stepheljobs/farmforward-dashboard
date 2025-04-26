<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $employmentStatuses = ['Active', 'Inactive', 'On Leave', 'Terminated'];
        $dateHired = $this->faker->dateTimeBetween('-5 years', '-1 month');
        
        // Determine if employee has been separated (20% chance)
        $isSeparated = $this->faker->boolean(20);
        $dateSeparated = $isSeparated 
            ? $this->faker->dateTimeBetween($dateHired, 'now') 
            : null;
        
        return [
            'last_name' => $this->faker->lastName(),
            'first_name' => $this->faker->firstName(),
            'middle_initial' => $this->faker->randomLetter(),
            'employee_id' => $this->faker->unique()->numberBetween(1000, 9999),
            'position' => $this->faker->jobTitle(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone_number' => $this->faker->phoneNumber(),
            'address_sitio' => $this->faker->streetAddress(),
            'address_barangay' => $this->faker->word() . ' ' . $this->faker->randomLetter(),
            'address_city' => $this->faker->city(),
            'address_province' => $this->faker->state(),
            'employment_status' => $isSeparated ? 'Terminated' : $this->faker->randomElement($employmentStatuses),
            'date_hired' => $dateHired,
            'date_separated' => $dateSeparated,
        ];
    }
} 