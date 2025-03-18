<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CropCommitment extends Model
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
        'estimated_quantity',
        'expected_harvest_date',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'estimated_quantity' => 'float',
        'expected_harvest_date' => 'date',
    ];

    /**
     * Get the farmer that owns the crop commitment.
     */
    public function farmer()
    {
        return $this->belongsTo(Farmer::class);
    }

    /**
     * Get the crop type that the commitment is for.
     */
    public function cropType()
    {
        return $this->belongsTo(CropType::class);
    }
} 