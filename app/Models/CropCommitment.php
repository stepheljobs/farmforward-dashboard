<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CropCommitment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'farmer_id',
        'crop_type_id',
        'quantity',
        'status',
        'commitment_date',
        'fulfillment_date'
    ];

    protected $casts = [
        'commitment_date' => 'date',
        'fulfillment_date' => 'date',
        'quantity' => 'float'
    ];

    public function farmer()
    {
        return $this->belongsTo(Farmer::class);
    }

    public function cropType()
    {
        return $this->belongsTo(CropType::class);
    }
} 