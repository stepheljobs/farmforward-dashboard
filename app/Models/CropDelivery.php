<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CropDelivery extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'farmer_id',
        'crop_type_id',
        'quantity',
        'quality_grade',
        'delivery_date',
        'receipt_number',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'float',
        'quality_grade' => 'integer',
        'delivery_date' => 'date',
    ];

    /**
     * Get the farmer that owns the crop delivery.
     */
    public function farmer()
    {
        return $this->belongsTo(Farmer::class);
    }

    /**
     * Get the crop type that was delivered.
     */
    public function cropType()
    {
        return $this->belongsTo(CropType::class);
    }

    /**
     * Get the sales receipts for this delivery.
     */
    public function salesReceipts()
    {
        return $this->hasMany(SalesReceipt::class);
    }
} 