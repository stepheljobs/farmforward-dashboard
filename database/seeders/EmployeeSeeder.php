<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 20 random employees
        Employee::factory(20)->create();

        // Create a default admin employee
        Employee::factory()->create([
            'last_name' => 'Admin',
            'first_name' => 'System',
            'middle_initial' => 'A',
            'employee_id' => 1000,
            'position' => 'System Administrator',
            'email' => 'admin@farmforward.com',
            'phone_number' => '123-456-7890',
            'address_sitio' => 'Main Office',
            'address_barangay' => 'Central',
            'address_city' => 'Metro City',
            'address_province' => 'Metro Province',
            'employment_status' => 'Active',
            'date_hired' => now()->subYears(2),
        ]);

        // Create a farm manager employee
        Employee::factory()->create([
            'last_name' => 'Manager',
            'first_name' => 'Farm',
            'middle_initial' => 'M',
            'employee_id' => 1001,
            'position' => 'Farm Manager',
            'email' => 'manager@farmforward.com',
            'phone_number' => '123-456-7891',
            'address_sitio' => 'Farm Office',
            'address_barangay' => 'East',
            'address_city' => 'Farm City',
            'address_province' => 'Farm Province',
            'employment_status' => 'Active',
            'date_hired' => now()->subYears(1),
        ]);
    }
} 