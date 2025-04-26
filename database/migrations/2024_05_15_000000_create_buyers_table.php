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
        Schema::create('buyers', function (Blueprint $table) {
            $table->id();
            $table->string('nickname')->nullable();
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_initial')->nullable();
            $table->string('buyer_id')->unique();
            $table->date('birthdate')->nullable();
            $table->string('email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('sitio_purok_subdivision')->nullable();
            $table->string('barangay')->nullable();
            $table->string('city_municipality')->nullable();
            $table->string('province')->nullable();
            $table->string('status');
            $table->string('destination')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buyers');
    }
}; 