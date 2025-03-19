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
        Schema::create('sales_invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('invoice_number', 20)->unique();
            $table->timestamp('date');
            $table->uuid('buyer_id')->nullable();
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax', 10, 2)->nullable();
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['draft', 'final', 'void'])->default('draft');
            $table->enum('payment_status', ['pending', 'partial', 'paid'])->default('pending');
            $table->timestamps();
        });

        Schema::create('sales_invoice_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('sales_invoice_id');
            $table->string('crop_arrival_stub', 50);
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->string('crop_type', 50);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('sales_invoice_id')
                  ->references('id')
                  ->on('sales_invoices')
                  ->onDelete('cascade');

            $table->foreign('crop_arrival_stub')
                  ->references('stub_no')
                  ->on('crop_arrivals')
                  ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_invoice_items');
        Schema::dropIfExists('sales_invoices');
    }
};
