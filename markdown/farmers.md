# Farmer Model Documentation for Laravel

## Farmer Journey Overview

Based on the flow diagram and project brief, here's a detailed breakdown of the farmer's journey in the system:

1. **Registration**
   - Farmers join as organization members
   - Personal and farm details are collected
   - Account is created in the system

2. **Crop Planning & Commitment**
   - Farmers submit information about upcoming season's crop planting
   - Details include crop types, estimated quantities, and expected harvest dates
   - System records these commitments for forecasting

3. **Crop Delivery**
   - Farmers deliver harvested crops to the organization's warehouse
   - Crops are weighed, quality-checked, and recorded in inventory
   - Farmers receive a delivery receipt

4. **Sales Process**
   - Organization handles market distribution and sales
   - Crops are sold to buyers through the POS system
   - Sales receipts are generated

5. **Payment Request & Withdrawal**
   - Farmers can request to withdraw their earnings
   - System calculates payments based on sales and agreed terms
   - Payments are processed by the accounting team

6. **Cycle Restart**
   - After receiving payment, farmers can commit to new crop plantings
   - The cycle continues for subsequent growing seasons

## Farmer Model Design for Laravel

### Database Schema

```php
/**
 * Farmer Model Schema
 * This represents the database structure for the farmers table
 */

Schema::create('farmers', function (Blueprint $table) {
    $table->id();
    $table->string('first_name');
    $table->string('last_name');
    $table->string('email')->unique()->nullable();
    $table->string('phone_number');
    $table->string('address');
    $table->string('city');
    $table->string('province');
    $table->string('postal_code')->nullable();
    $table->text('farm_description')->nullable();
    $table->float('farm_size_hectares')->nullable();
    $table->enum('status', ['active', 'inactive', 'pending'])->default('pending');
    $table->date('registration_date');
    $table->date('membership_renewal_date')->nullable();
    $table->string('profile_image')->nullable();
    $table->timestamps();
    $table->softDeletes(); // For soft deletion
});
```

### Model Relationships

```php
/**
 * Relationships with other models in the system
 */

// Crop Commitments relationship
public function cropCommitments()
{
    return $this->hasMany(CropCommitment::class);
}

// Crop Deliveries relationship
public function cropDeliveries()
{
    return $this->hasMany(CropDelivery::class);
}

// Sales Receipts relationship (through CropDelivery)
public function salesReceipts()
{
    return $this->hasManyThrough(SalesReceipt::class, CropDelivery::class);
}

// Payment Withdrawals relationship
public function paymentWithdrawals()
{
    return $this->hasMany(PaymentWithdrawal::class);
}

// Farm relationship (if you have a separate farms table)
public function farms()
{
    return $this->hasMany(Farm::class);
}
```

### Related Models

Based on the farmer journey, you'll likely need these additional models:

1. **CropCommitment Model**
   - Records farmer's commitments for upcoming crops
   - Fields: farmer_id, crop_type_id, estimated_quantity, expected_harvest_date, status

2. **CropDelivery Model**
   - Records when farmers deliver crops to the warehouse
   - Fields: farmer_id, crop_type_id, quantity, quality_grade, delivery_date, receipt_number

3. **SalesReceipt Model**
   - Records sales of crops
   - Fields: crop_delivery_id, amount, sale_date, buyer_id

4. **PaymentWithdrawal Model**
   - Records farmer payment requests and processing
   - Fields: farmer_id, amount, status, request_date, process_date

### Methods for Farmer Model

```php
/**
 * Business logic methods for the Farmer model
 */

// Get total earnings for a farmer
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

// Get pending payment amount (earnings minus withdrawals)
public function getPendingPaymentAmount()
{
    $totalEarnings = $this->getTotalEarnings();
    $totalWithdrawals = $this->paymentWithdrawals()
        ->where('status', 'completed')
        ->sum('amount');
    
    return $totalEarnings - $totalWithdrawals;
}

// Check if farmer has met their crop commitments
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

// Get farmer performance metrics
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
```

## Implementation Recommendations

1. **Authentication Integration**:
   - Consider integrating the Farmer model with Laravel's authentication system
   - Create a separate User model that can be linked to either a Farmer or Staff member

2. **Validation Rules**:
   - Implement validation rules for farmer registration and data updates
   - Ensure phone numbers and other critical fields follow proper formats

3. **Events & Notifications**:
   - Create events for key farmer activities (registration, delivery, payment)
   - Set up notifications for important status changes

4. **API Resources**:
   - Create API resources for the Farmer model to standardize JSON responses
   - Include proper data transformations for frontend consumption

5. **Policies & Permissions**:
   - Implement Laravel policies to control access to farmer data
   - Ensure farmers can only access their own information

This documentation should provide a solid foundation for implementing the Farmer model in Laravel, aligned with the flow in the diagram and the requirements in the project brief.
