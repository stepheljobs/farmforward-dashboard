<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Crop extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'variety',
        'sku',
        'status',
    ];

    /**
     * Get the validation rules for the model.
     *
     * @return array<string, string>
     */
    public static function validationRules()
    {
        return [
            'name' => 'required|string|max:255',
            'variety' => 'nullable|string|max:255',
            'sku' => 'required|string|max:50|unique:crops,sku',
            'status' => 'required|string|max:50',
        ];
    }
} 