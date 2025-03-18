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
        Schema::create('crop_planners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farmer_id')->constrained()->onDelete('cascade');
            $table->foreignId('consultant_id')->nullable()->constrained('users');
            $table->foreignId('crop_type_id')->constrained()->onDelete('cascade');
            $table->decimal('planned_area_hectares', 10, 2);
            $table->decimal('estimated_quantity', 10, 2);
            $table->date('planned_planting_date');
            $table->date('expected_harvest_date');
            $table->text('consultant_notes')->nullable();
            $table->text('farmer_notes')->nullable();
            $table->enum('status', ['draft', 'pending_consultant', 'pending_farmer', 'approved', 'rejected'])->default('draft');
            $table->timestamp('consultant_requested_at')->nullable();
            $table->timestamp('farmer_responded_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_planners');
    }
}; 