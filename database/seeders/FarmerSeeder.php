<?php

namespace Database\Seeders;

use App\Models\Farmer;
use Illuminate\Database\Seeder;

class FarmerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $farmers = [
            [
                'farmer_id_number' => 'FMR-001-24',
                'first_name' => 'Juan',
                'last_name' => 'Dela Cruz',
                'middle_initial' => 'M',
                'birthdate' => '1985-06-15',
                'email' => 'juan.delacruz@example.com',
                'phone_number' => '09171234567',
                'sitio_purok' => 'Purok 3',
                'barangay' => 'San Miguel',
                'city' => 'Batangas City',
                'province' => 'Batangas',
                'farm_description' => 'Multi-crop farm with modern irrigation',
                'farm_size_hectares' => 5.5,
                'farm_count' => 2,
                'status' => 'active',
                'membership_date' => '2024-01-01',
                'membership_renewal_date' => '2025-01-01',
                'photo' => 'farmers/juan_dela_cruz.jpg',
                'active_crop_commitments' => true,
                'violations' => true
            ],
            [
                'farmer_id_number' => 'FMR-002-24',
                'first_name' => 'Maria',
                'last_name' => 'Santos',
                'middle_initial' => 'D',
                'birthdate' => '1990-03-22',
                'email' => 'maria.santos@example.com',
                'phone_number' => '09182345678',
                'sitio_purok' => 'Sitio Mabuhay',
                'barangay' => 'Santa Cruz',
                'city' => 'San Pablo',
                'province' => 'Laguna',
                'farm_description' => 'Organic vegetable farm',
                'farm_size_hectares' => 3.2,
                'farm_count' => 1,
                'status' => 'active',
                'membership_date' => '2024-01-15',
                'membership_renewal_date' => '2025-01-15',
                'photo' => 'farmers/maria_santos.jpg',
                'active_crop_commitments' => true,
                'violations' => false
            ],
            [
                'farmer_id_number' => 'FMR-003-24',
                'first_name' => 'Pedro',
                'last_name' => 'Reyes',
                'middle_initial' => 'L',
                'birthdate' => '1982-11-07',
                'email' => 'pedro.reyes@example.com',
                'phone_number' => '09193456789',
                'sitio_purok' => 'Purok Maharlika',
                'barangay' => 'San Jose',
                'city' => 'Tagaytay',
                'province' => 'Cavite',
                'farm_description' => 'Highland vegetable farm',
                'farm_size_hectares' => 4.8,
                'farm_count' => 1,
                'status' => 'active',
                'membership_date' => '2024-02-01',
                'membership_renewal_date' => '2025-02-01',
                'photo' => 'farmers/pedro_reyes.jpg',
                'active_crop_commitments' => true,
                'violations' => true
            ],
            [
                'farmer_id_number' => 'FMR-004-24',
                'first_name' => 'Ana',
                'last_name' => 'Gonzales',
                'middle_initial' => 'R',
                'birthdate' => '1988-04-30',
                'email' => 'ana.gonzales@example.com',
                'phone_number' => '09204567890',
                'sitio_purok' => 'Sitio Riverside',
                'barangay' => 'Santo Tomas',
                'city' => 'Calamba',
                'province' => 'Laguna',
                'farm_description' => 'Riverside agricultural land',
                'farm_size_hectares' => 6.7,
                'farm_count' => 3,
                'status' => 'active',
                'membership_date' => '2024-02-15',
                'membership_renewal_date' => '2025-02-15',
                'photo' => 'farmers/ana_gonzales.jpg',
                'active_crop_commitments' => true,
                'violations' => false
            ],
            [
                'farmer_id_number' => 'FMR-005-24',
                'first_name' => 'Roberto',
                'last_name' => 'Tan',
                'middle_initial' => 'G',
                'birthdate' => '1979-08-12',
                'email' => 'roberto.tan@example.com',
                'phone_number' => '09215678901',
                'sitio_purok' => 'Purok 7',
                'barangay' => 'San Pedro',
                'city' => 'Lipa City',
                'province' => 'Batangas',
                'farm_description' => 'Mixed crop farm',
                'farm_size_hectares' => 4.2,
                'farm_count' => 2,
                'status' => 'active',
                'membership_date' => '2024-03-01',
                'membership_renewal_date' => '2025-03-01',
                'photo' => 'farmers/roberto_tan.jpg',
                'active_crop_commitments' => true,
                'violations' => true
            ],
            [
                'farmer_id_number' => 'FMR-006-24',
                'first_name' => 'Elena',
                'last_name' => 'Cruz',
                'middle_initial' => 'F',
                'birthdate' => '1992-05-18',
                'email' => 'elena.cruz@example.com',
                'phone_number' => '09226789012',
                'sitio_purok' => 'Sitio Malaya',
                'barangay' => 'Santa Maria',
                'city' => 'Silang',
                'province' => 'Cavite',
                'farm_description' => 'Small-scale organic farm',
                'farm_size_hectares' => 3.8,
                'farm_count' => 1,
                'status' => 'active',
                'membership_date' => '2024-03-15',
                'membership_renewal_date' => '2025-03-15',
                'photo' => 'farmers/elena_cruz.jpg',
                'active_crop_commitments' => true,
                'violations' => false
            ],
            [
                'farmer_id_number' => 'FMR-007-24',
                'first_name' => 'Carlos',
                'last_name' => 'Garcia',
                'middle_initial' => 'B',
                'birthdate' => '1984-09-25',
                'email' => 'carlos.garcia@example.com',
                'phone_number' => '09237890123',
                'sitio_purok' => 'Purok 4',
                'barangay' => 'San Rafael',
                'city' => 'Tanauan',
                'province' => 'Batangas',
                'farm_description' => 'Traditional farming methods',
                'farm_size_hectares' => 5.1,
                'farm_count' => 2,
                'status' => 'active',
                'membership_date' => '2024-01-20',
                'membership_renewal_date' => '2025-01-20',
                'photo' => 'farmers/carlos_garcia.jpg',
                'active_crop_commitments' => true,
                'violations' => false
            ],
            [
                'farmer_id_number' => 'FMR-008-24',
                'first_name' => 'Isabella',
                'last_name' => 'Ramos',
                'middle_initial' => 'T',
                'birthdate' => '1993-02-14',
                'email' => 'isabella.ramos@example.com',
                'phone_number' => '09248901234',
                'sitio_purok' => 'Sitio Maganda',
                'barangay' => 'Santa Clara',
                'city' => 'Alfonso',
                'province' => 'Cavite',
                'farm_description' => 'Sustainable farming practices',
                'farm_size_hectares' => 2.9,
                'farm_count' => 1,
                'status' => 'active',
                'membership_date' => '2024-02-20',
                'membership_renewal_date' => '2025-02-20',
                'photo' => 'farmers/isabella_ramos.jpg',
                'active_crop_commitments' => true,
                'violations' => false
            ],
            [
                'farmer_id_number' => 'FMR-009-24',
                'first_name' => 'Miguel',
                'last_name' => 'Torres',
                'middle_initial' => 'S',
                'birthdate' => '1980-12-05',
                'email' => 'miguel.torres@example.com',
                'phone_number' => '09259012345',
                'sitio_purok' => 'Purok 1',
                'barangay' => 'San Lorenzo',
                'city' => 'Laurel',
                'province' => 'Batangas',
                'farm_description' => 'Mountain terraced farm',
                'farm_size_hectares' => 4.5,
                'farm_count' => 2,
                'status' => 'active',
                'membership_date' => '2024-03-05',
                'membership_renewal_date' => '2025-03-05',
                'photo' => 'farmers/miguel_torres.jpg',
                'active_crop_commitments' => true,
                'violations' => true
            ],
            [
                'farmer_id_number' => 'FMR-010-24',
                'first_name' => 'Sofia',
                'last_name' => 'Mendoza',
                'middle_initial' => 'P',
                'birthdate' => '1987-07-19',
                'email' => 'sofia.mendoza@example.com',
                'phone_number' => '09260123456',
                'sitio_purok' => 'Sitio Bagong Pag-asa',
                'barangay' => 'Santa Rosa',
                'city' => 'Santa Rosa',
                'province' => 'Laguna',
                'farm_description' => 'Modern farming techniques',
                'farm_size_hectares' => 7.3,
                'farm_count' => 3,
                'status' => 'active',
                'membership_date' => '2024-03-10',
                'membership_renewal_date' => '2025-03-10',
                'photo' => 'farmers/sofia_mendoza.jpg',
                'active_crop_commitments' => true,
                'violations' => false
            ],
        ];

        foreach ($farmers as $farmer) {
            Farmer::create($farmer);
        }
    }
} 