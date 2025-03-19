<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SalesInvoiceItem extends Model
{
    use HasUuids;

    protected $fillable = [
        'sales_invoice_id',
        'crop_arrival_stub',
        'quantity',
        'unit_price',
        'total_price',
        'crop_type',
        'notes',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    public function salesInvoice(): BelongsTo
    {
        return $this->belongsTo(SalesInvoice::class);
    }

    public function cropArrival(): BelongsTo
    {
        return $this->belongsTo(CropArrival::class, 'crop_arrival_stub', 'stub_no');
    }
}
