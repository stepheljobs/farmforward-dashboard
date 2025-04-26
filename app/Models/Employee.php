<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_initial',
        'employee_id',
        'position',
        'email',
        'phone_number',
        'address_sitio',
        'address_barangay',
        'address_city',
        'address_province',
        'employment_status',
        'date_hired',
        'date_separated',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'employee_id' => 'integer',
        'date_hired' => 'date',
        'date_separated' => 'date',
    ];

    /**
     * Get the validation rules for the model.
     *
     * @return array<string, string>
     */
    public static function validationRules()
    {
        return [
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:1',
            'employee_id' => 'required|integer|unique:employees,employee_id',
            'position' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone_number' => 'required|string|max:20',
            'address_sitio' => 'required|string|max:255',
            'address_barangay' => 'required|string|max:255',
            'address_city' => 'required|string|max:255',
            'address_province' => 'required|string|max:255',
            'employment_status' => 'required|string|max:50',
            'date_hired' => 'required|date',
            'date_separated' => 'nullable|date',
        ];
    }
} 