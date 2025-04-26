<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentWithdrawal extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'farmer_id',
        'sales_id',
        'amount',
        'payment_method',
        'bank_name',
        'account_number',
        'account_name',
        'status',
        'reference_number',
        'request_date',
        'process_date',
        'approved_by',
        'approved_at',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'float',
        'request_date' => 'date',
        'process_date' => 'date',
        'approved_at' => 'datetime',
    ];

    /**
     * Get the farmer that requested the withdrawal.
     */
    public function farmer()
    {
        return $this->belongsTo(Farmer::class);
    }

    /**
     * Get the sale associated with the withdrawal.
     */
    public function sale()
    {
        return $this->belongsTo(Sale::class, 'sales_id');
    }

    /**
     * Get the user who approved the withdrawal.
     */
    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
} 