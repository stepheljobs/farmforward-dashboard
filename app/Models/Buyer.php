<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'buyer_id',
        'phone_number',
        'address',
        'status',
        'destination',
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
            'buyer_id' => 'required|string|max:255|unique:buyers,buyer_id',
            'phone_number' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'status' => 'required|string|max:50',
            'destination' => 'nullable|string|max:255',
        ];
    }
} 