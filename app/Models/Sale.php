<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Sale extends Model
{
    use HasUuids;

    protected $fillable = [
        'sales_number',
        'sales_invoice_id',
        'finalized_at',
        'finalized_by',
        'final_amount',
        'status',
        'notes'
    ];

    protected $casts = [
        'finalized_at' => 'datetime',
        'final_amount' => 'decimal:2',
    ];

    public function salesInvoice(): BelongsTo
    {
        return $this->belongsTo(SalesInvoice::class);
    }
}
