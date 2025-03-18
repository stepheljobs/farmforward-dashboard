<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesReceipt extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'crop_delivery_id',
        'buyer_id',
        'amount',
        'sale_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'float',
        'sale_date' => 'date',
    ];

    /**
     * Get the crop delivery that the sales receipt is for.
     */
    public function cropDelivery()
    {
        return $this->belongsTo(CropDelivery::class);
    }

    /**
     * Get the farmer indirectly through the crop delivery.
     */
    public function farmer()
    {
        return $this->hasOneThrough(
            Farmer::class,
            CropDelivery::class,
            'id', // Foreign key on crop_deliveries table
            'id', // Foreign key on farmers table
            'crop_delivery_id', // Local key on sales_receipts table
            'farmer_id' // Local key on crop_deliveries table
        );
    }

    /**
     * Get the buyer that purchased the crops.
     */
    public function buyer()
    {
        return $this->belongsTo(Buyer::class);
    }
} 