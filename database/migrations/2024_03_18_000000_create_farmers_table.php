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
        Schema::create('farmers', function (Blueprint $table) {
            $table->id();
            $table->string('farmer_id_number')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_initial')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('phone_number');
            $table->string('sitio_purok')->nullable();
            $table->string('barangay')->nullable();
            $table->string('city');
            $table->string('province');
            $table->string('postal_code')->nullable();
            $table->text('farm_description')->nullable();
            $table->float('farm_size_hectares')->nullable();
            $table->integer('farm_count')->nullable();
            $table->enum('status', ['active', 'inactive', 'pending'])->default('pending');
            $table->date('membership_date')->nullable();
            $table->date('membership_renewal_date')->nullable();
            $table->string('photo')->nullable();
            $table->boolean('active_crop_commitments')->default(false);
            $table->boolean('violations')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmers');
    }
}; 