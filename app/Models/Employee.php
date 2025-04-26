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
        'name',
        'employee_id',
        'position',
        'email',
        'phone_number',
        'address',
        'employment_status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'employee_id' => 'integer',
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
            'employee_id' => 'required|integer|unique:employees,employee_id',
            'position' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'employment_status' => 'required|string|max:50',
        ];
    }
} 