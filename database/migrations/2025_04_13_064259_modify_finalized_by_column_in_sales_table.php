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
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn('finalized_by');
        });

        Schema::table('sales', function (Blueprint $table) {
            $table->foreignId('finalized_by')->constrained('users')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropForeign(['finalized_by']);
            $table->dropColumn('finalized_by');
        });

        Schema::table('sales', function (Blueprint $table) {
            $table->string('finalized_by');
        });
    }
};
