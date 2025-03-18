<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CropPlanner extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'farmer_id',
        'consultant_id',
        'crop_type_id',
        'planned_area_hectares',
        'estimated_quantity',
        'planned_planting_date',
        'expected_harvest_date',
        'consultant_notes',
        'farmer_notes',
        'status',
        'consultant_requested_at',
        'farmer_responded_at',
        'location',
        'variety',
        'volume_inputs',
        'volume_inputs_type',
        'contact_number'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'planned_area_hectares' => 'float',
        'estimated_quantity' => 'float',
        'planned_planting_date' => 'date',
        'expected_harvest_date' => 'date',
        'consultant_requested_at' => 'datetime',
        'farmer_responded_at' => 'datetime',
        'volume_inputs' => 'float'
    ];

    /**
     * Get the farmer that owns the crop planner.
     */
    public function farmer()
    {
        return $this->belongsTo(Farmer::class);
    }

    /**
     * Get the consultant that created the crop planner.
     */
    public function consultant()
    {
        return $this->belongsTo(User::class, 'consultant_id');
    }

    /**
     * Get the crop type that is being planned.
     */
    public function cropType()
    {
        return $this->belongsTo(CropType::class);
    }
} 