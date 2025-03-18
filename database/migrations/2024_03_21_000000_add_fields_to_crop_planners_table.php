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
        Schema::table('crop_planners', function (Blueprint $table) {
            $table->string('location')->nullable()->after('farmer_id');
            $table->string('variety')->nullable()->after('crop_type_id');
            $table->float('volume_inputs')->nullable()->after('planned_area_hectares');
            $table->enum('volume_inputs_type', ['can', 'plants', 'lata', 'kg', 'seeds', 'g'])->nullable()->after('volume_inputs');
            $table->string('contact_number')->nullable()->after('farmer_notes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crop_planners', function (Blueprint $table) {
            $table->dropColumn(['location', 'variety', 'volume_inputs', 'volume_inputs_type', 'contact_number']);
        });
    }
}; 