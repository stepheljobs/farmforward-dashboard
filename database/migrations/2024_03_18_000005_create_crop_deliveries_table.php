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
        Schema::create('crop_deliveries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farmer_id')->constrained()->onDelete('cascade');
            $table->foreignId('crop_type_id')->constrained()->onDelete('cascade');
            $table->decimal('quantity', 10, 2);
            $table->integer('quality_grade')->comment('Scale of 1-10, 10 being the best quality');
            $table->date('delivery_date');
            $table->string('receipt_number')->unique();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_deliveries');
    }
}; 