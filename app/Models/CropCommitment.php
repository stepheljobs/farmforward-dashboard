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
        'estimated_quantity',
        'expected_harvest_date',
        'status'
    ];

    protected $casts = [
        'expected_harvest_date' => 'date',
        'estimated_quantity' => 'float'
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