<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Buyer extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'contact_person',
        'email',
        'phone_number',
        'address',
        'city',
        'province',
        'postal_code',
        'buyer_type',
        'status',
    ];

    /**
     * Get the sales receipts for this buyer.
     */
    public function salesReceipts()
    {
        return $this->hasMany(SalesReceipt::class);
    }

    /**
     * Get the full name attribute.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return $this->name;
    }
} 