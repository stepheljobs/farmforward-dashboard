<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CropCommitment;

class Farmer extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'farmer_id_number',
        'first_name',
        'last_name',
        'middle_initial',
        'birthdate',
        'email',
        'phone_number',
        'sitio_purok',
        'barangay',
        'city',
        'province',
        'farm_description',
        'farm_size_hectares',
        'farm_count',
        'status',
        'membership_date',
        'membership_renewal_date',
        'photo',
        'active_crop_commitments',
        'violations'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'farm_size_hectares' => 'float',
        'farm_count' => 'integer',
        'birthdate' => 'date',
        'membership_date' => 'date',
        'membership_renewal_date' => 'date',
    ];

    /**
     * Get the crop commitments for the farmer.
     */
    public function cropCommitments()
    {
        return $this->hasMany(CropCommitment::class);
    }

    /**
     * Get the crop deliveries for the farmer.
     */
    public function cropDeliveries()
    {
        return $this->hasMany(CropDelivery::class);
    }

    /**
     * Get the sales receipts for the farmer through crop deliveries.
     */
    public function salesReceipts()
    {
        return $this->hasManyThrough(SalesReceipt::class, CropDelivery::class);
    }

    /**
     * Get the payment withdrawals for the farmer.
     */
    public function paymentWithdrawals()
    {
        return $this->hasMany(PaymentWithdrawal::class);
    }

    /**
     * Get the farms for the farmer.
     */
    public function farms()
    {
        return $this->hasMany(Farm::class);
    }

    /**
     * Get total earnings for a farmer within a date range.
     *
     * @param string|null $startDate
     * @param string|null $endDate
     * @return float
     */
    public function getTotalEarnings($startDate = null, $endDate = null)
    {
        $query = $this->salesReceipts();
        
        if ($startDate) {
            $query->where('sale_date', '>=', $startDate);
        }
        
        if ($endDate) {
            $query->where('sale_date', '<=', $endDate);
        }
        
        return $query->sum('amount');
    }

    /**
     * Get pending payment amount (earnings minus withdrawals).
     *
     * @return float
     */
    public function getPendingPaymentAmount()
    {
        $totalEarnings = $this->getTotalEarnings();
        $totalWithdrawals = $this->paymentWithdrawals()
            ->where('status', 'completed')
            ->sum('amount');
        
        return $totalEarnings - $totalWithdrawals;
    }

    /**
     * Check if farmer has met their crop commitments.
     *
     * @return float
     */
    public function getCommitmentFulfillmentRate()
    {
        $commitments = $this->cropCommitments()->get();
        $total = $commitments->count();
        
        if ($total === 0) {
            return 0;
        }
        
        $fulfilled = $commitments->where('status', 'fulfilled')->count();
        
        return ($fulfilled / $total) * 100;
    }

    /**
     * Get farmer performance metrics.
     *
     * @param int|null $year
     * @return array
     */
    public function getPerformanceMetrics($year = null)
    {
        // If no year provided, use current year
        $year = $year ?? date('Y');
        
        // Get all deliveries in the specified year
        $deliveries = $this->cropDeliveries()
            ->whereYear('delivery_date', $year)
            ->get();
        
        // Calculate total quantity delivered
        $totalQuantity = $deliveries->sum('quantity');
        
        // Calculate average quality grade
        $averageQuality = $deliveries->avg('quality_grade');
        
        // Calculate total earnings
        $startDate = "$year-01-01";
        $endDate = "$year-12-31";
        $totalEarnings = $this->getTotalEarnings($startDate, $endDate);
        
        return [
            'total_quantity' => $totalQuantity,
            'average_quality' => $averageQuality,
            'total_earnings' => $totalEarnings
        ];
    }

    /**
     * Get the full name of the farmer.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        if ($this->middle_initial) {
            return "{$this->last_name}, {$this->first_name} {$this->middle_initial}.";
        }
        return "{$this->last_name}, {$this->first_name}";
    }

    /**
     * Get the full address of the farmer.
     *
     * @return string
     */
    public function getAddressAttribute()
    {
        $address = [];
        
        if (!empty($this->sitio_purok)) {
            $address[] = $this->sitio_purok;
        }
        
        if (!empty($this->barangay)) {
            $address[] = $this->barangay;
        }
        
        if (!empty($this->city)) {
            $address[] = $this->city;
        }
        
        if (!empty($this->province)) {
            $address[] = $this->province;
        }
        
        return implode(', ', $address);
    }
} 