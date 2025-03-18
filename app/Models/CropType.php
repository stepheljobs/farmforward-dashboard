<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CropType extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'season',
        'growing_period_days',
        'price_per_kg',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'growing_period_days' => 'integer',
        'price_per_kg' => 'float',
        'is_active' => 'boolean',
    ];

    /**
     * Get the crop commitments for this crop type.
     */
    public function cropCommitments()
    {
        return $this->hasMany(CropCommitment::class);
    }

    /**
     * Get the crop deliveries for this crop type.
     */
    public function cropDeliveries()
    {
        return $this->hasMany(CropDelivery::class);
    }
} 