<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CropArrival extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'stub_no',
        'received_date',
        'farmer_id',
        'field_id',
        'crop_type_id',
        'quantity_good',
        'quantity_semi',
        'quantity_reject',
        'receipt_id',
        'receipt_name',
    ];

    protected $casts = [
        'received_date' => 'date',
        'stub_no' => 'string',
        'quantity_good' => 'float',
        'quantity_semi' => 'float',
        'quantity_reject' => 'float',
    ];

    public function farmer()
    {
        return $this->belongsTo(Farmer::class);
    }

    public function field()
    {
        return $this->belongsTo(Farm::class, 'field_id');
    }

    public function cropType()
    {
        return $this->belongsTo(CropType::class);
    }
} 