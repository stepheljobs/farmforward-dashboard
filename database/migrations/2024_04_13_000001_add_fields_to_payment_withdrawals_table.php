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
        Schema::table('payment_withdrawals', function (Blueprint $table) {
            $table->string('payment_method')->nullable()->after('amount');
            $table->string('bank_name')->nullable()->after('payment_method');
            $table->string('account_number')->nullable()->after('bank_name');
            $table->string('account_name')->nullable()->after('account_number');
            $table->foreignId('approved_by')->nullable()->constrained('users')->after('process_date');
            $table->timestamp('approved_at')->nullable()->after('approved_by');
            $table->foreignId('sales_id')->nullable()->constrained()->after('farmer_id');
            $table->string('reference_number')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payment_withdrawals', function (Blueprint $table) {
            $table->dropColumn([
                'payment_method',
                'bank_name',
                'account_number',
                'account_name',
                'approved_by',
                'approved_at',
                'sales_id',
                'reference_number'
            ]);
        });
    }
}; 