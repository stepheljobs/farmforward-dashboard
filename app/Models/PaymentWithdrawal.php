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
        'amount',
        'status',
        'request_date',
        'process_date',
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
    ];

    /**
     * Get the farmer that requested the withdrawal.
     */
    public function farmer()
    {
        return $this->belongsTo(Farmer::class);
    }
} 