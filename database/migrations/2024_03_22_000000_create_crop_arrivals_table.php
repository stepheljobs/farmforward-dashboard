<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('crop_arrivals', function (Blueprint $table) {
            $table->id();
            $table->string('stub_no')->unique()->comment('Format: YYYYMMDDhhmm');
            $table->date('received_date');
            $table->foreignId('farmer_id')->constrained()->onDelete('cascade');
            $table->foreignId('field_id')->constrained('farms')->onDelete('cascade');
            $table->foreignId('crop_type_id')->constrained()->onDelete('cascade');
            $table->decimal('quantity_good', 10, 2)->default(0);
            $table->decimal('quantity_semi', 10, 2)->default(0);
            $table->decimal('quantity_reject', 10, 2)->default(0);
            $table->string('receipt_id');
            $table->string('receipt_name');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('crop_arrivals');
    }
}; 