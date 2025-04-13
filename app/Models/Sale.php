<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sale extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'sales_number',
        'sales_invoice_id',
        'finalized_by',
        'final_amount',
        'status',
        'notes'
    ];

    protected $casts = [
        'final_amount' => 'decimal:2',
    ];

    public function salesInvoice(): BelongsTo
    {
        return $this->belongsTo(SalesInvoice::class);
    }

    public function finalizedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'finalized_by');
    }
}
