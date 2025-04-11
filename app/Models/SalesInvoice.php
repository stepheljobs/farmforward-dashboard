<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class SalesInvoice extends Model
{
    use HasUuids;
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'date',
        'buyer_id',
        'subtotal',
        'total_amount',
        'status',
        'payment_status',
    ];

    protected $casts = [
        'date' => 'datetime',
        'subtotal' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    public function buyer()
    {
        return $this->belongsTo(Buyer::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(SalesInvoiceItem::class);
    }

    public function sale()
    {
        return $this->hasOne(Sale::class);
    }
}
