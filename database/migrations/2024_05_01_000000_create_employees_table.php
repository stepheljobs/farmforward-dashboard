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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_initial')->nullable();
            $table->integer('employee_id')->unique();
            $table->string('position');
            $table->string('email')->unique();
            $table->string('phone_number');
            $table->string('address_sitio');
            $table->string('address_barangay');
            $table->string('address_city');
            $table->string('address_province');
            $table->string('employment_status');
            $table->date('date_hired');
            $table->date('date_separated')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
}; 