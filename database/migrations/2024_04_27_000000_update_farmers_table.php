<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('farmers', function (Blueprint $table) {
            // Skip renaming columns as they already have the correct names
            
            // The postal_code column already exists, so only drop address column if it exists
            if (Schema::hasColumn('farmers', 'address')) {
                $table->dropColumn('address');
            }
            
            // Add new columns that don't exist yet
            if (!Schema::hasColumn('farmers', 'farmer_id_number')) {
                $table->string('farmer_id_number')->after('id')->unique();
            }
            
            // These columns already exist in the table, so we'll skip them
            // The following are existing columns per our check: 
            // middle_initial, birthdate, sitio_purok, barangay, farm_count
            
            // Convert active_crop_commitments and violations from boolean to integer if they exist as boolean
            if (Schema::hasColumn('farmers', 'active_crop_commitments') && 
                DB::getSchemaBuilder()->getColumnType('farmers', 'active_crop_commitments') === 'boolean') {
                $table->integer('active_crop_commitments')->default(0)->change();
            }
            
            if (Schema::hasColumn('farmers', 'violations') && 
                DB::getSchemaBuilder()->getColumnType('farmers', 'violations') === 'boolean') {
                $table->integer('violations')->default(0)->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('farmers', function (Blueprint $table) {
            // No need to rename columns back as we didn't rename them
            
            // Add back address column if it was removed
            $table->string('address')->after('phone_number')->nullable();
            
            // Drop farmer_id_number if we added it
            if (Schema::hasColumn('farmers', 'farmer_id_number')) {
                $table->dropColumn('farmer_id_number');
            }
            
            // Convert active_crop_commitments and violations back to boolean if they exist as integer
            if (Schema::hasColumn('farmers', 'active_crop_commitments') && 
                DB::getSchemaBuilder()->getColumnType('farmers', 'active_crop_commitments') === 'integer') {
                $table->boolean('active_crop_commitments')->default(false)->change();
            }
            
            if (Schema::hasColumn('farmers', 'violations') && 
                DB::getSchemaBuilder()->getColumnType('farmers', 'violations') === 'integer') {
                $table->boolean('violations')->default(false)->change();
            }
        });
    }
}; 