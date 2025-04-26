<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('farmers', function (Blueprint $table) {
            // Rename existing columns
            $table->renameColumn('registration_date', 'membership_date');
            $table->renameColumn('profile_image', 'photo');
            
            // Drop address and postal_code columns
            $table->dropColumn(['address', 'postal_code']);
            
            // Add new columns
            $table->string('farmer_id_number')->after('id')->unique();
            $table->string('middle_initial')->nullable()->after('last_name');
            $table->date('birthdate')->nullable()->after('middle_initial');
            $table->string('sitio_purok')->nullable()->after('phone_number');
            $table->string('barangay')->nullable()->after('sitio_purok');
            $table->integer('farm_count')->default(1)->after('farm_size_hectares');
            $table->integer('active_crop_commitments')->default(0)->after('photo');
            $table->integer('violations')->default(0)->after('active_crop_commitments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('farmers', function (Blueprint $table) {
            // Rename columns back
            $table->renameColumn('membership_date', 'registration_date');
            $table->renameColumn('photo', 'profile_image');
            
            // Add back old columns
            $table->string('address')->after('phone_number');
            $table->string('postal_code')->nullable()->after('province');
            
            // Drop new columns
            $table->dropColumn([
                'farmer_id_number',
                'middle_initial',
                'birthdate',
                'sitio_purok',
                'barangay',
                'farm_count',
                'active_crop_commitments',
                'violations'
            ]);
        });
    }
}; 