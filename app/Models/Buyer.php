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
        'nickname',
        'last_name',
        'first_name',
        'middle_initial',
        'buyer_id',
        'birthdate',
        'email',
        'phone_number',
        'sitio_purok_subdivision',
        'barangay',
        'city_municipality',
        'province',
        'status',
        'destination',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birthdate' => 'date',
    ];

    /**
     * Get the buyer's full name.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        $middleInitial = $this->middle_initial ? " " . $this->middle_initial . "." : "";
        return $this->first_name . $middleInitial . " " . $this->last_name;
    }

    /**
     * Get the buyer's complete address.
     *
     * @return string
     */
    public function getCompleteAddressAttribute()
    {
        $parts = [];
        if ($this->sitio_purok_subdivision) $parts[] = $this->sitio_purok_subdivision;
        if ($this->barangay) $parts[] = $this->barangay;
        if ($this->city_municipality) $parts[] = $this->city_municipality;
        if ($this->province) $parts[] = $this->province;
        
        return implode(", ", $parts);
    }

    /**
     * Get the validation rules for the model.
     *
     * @return array<string, string>
     */
    public static function validationRules()
    {
        return [
            'nickname' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:10',
            'buyer_id' => 'required|string|max:255|unique:buyers,buyer_id',
            'birthdate' => 'nullable|date',
            'email' => 'nullable|email|max:255',
            'phone_number' => 'nullable|string|max:255',
            'sitio_purok_subdivision' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'city_municipality' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'status' => 'required|string|max:50',
            'destination' => 'nullable|string|max:255',
        ];
    }
} 