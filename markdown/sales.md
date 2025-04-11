I'll help you create a comprehensive plan for the sales finalization feature and document it in the sales.md file. Here's the content we should add:

```markdown:markdown/sales.md
# Sales Record Finalization Feature

## Overview
This feature allows operations team to finalize sales by creating sales records from sales invoices. The process involves converting a sales invoice into a final sales record with additional tracking information.

## Database Changes

### Sales Table Migration
```php
public function up()
{
    Schema::create('sales', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->string('sales_number')->unique();
        $table->foreignUuid('sales_invoice_id')->constrained();
        $table->dateTime('finalized_at');
        $table->string('finalized_by');
        $table->decimal('final_amount', 10, 2);
        $table->string('status')->default('completed');
        $table->text('notes')->nullable();
        $table->timestamps();
    });
}
```

## Model Implementation

### Sales Model
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sale extends Model
{
    use HasUuids;

    protected $fillable = [
        'sales_number',
        'sales_invoice_id',
        'finalized_at',
        'finalized_by',
        'final_amount',
        'status',
        'notes'
    ];

    protected $casts = [
        'finalized_at' => 'datetime',
        'final_amount' => 'decimal:2',
    ];

    public function salesInvoice(): BelongsTo
    {
        return $this->belongsTo(SalesInvoice::class);
    }
}
```

### SalesInvoice Model Update
Add the following relation to the existing SalesInvoice model:
```php
public function sale()
{
    return $this->hasOne(Sale::class);
}
```

## Implementation Checklist

### Database Setup
- [ ] Create sales table migration
- [ ] Run migration
- [ ] Create Sale model
- [ ] Update SalesInvoice model with sale relation

### Controller & Business Logic
- [ ] Create SalesController
- [ ] Implement sales finalization logic
- [ ] Add validation rules for sales creation
- [ ] Implement sales number generation logic
- [ ] Add status update logic for sales invoice

### Views & Frontend
- [ ] Create sales finalization form
- [ ] Add sales invoice selection/search
- [ ] Implement sales invoice details preview
- [ ] Add confirmation modal
- [ ] Create success/error notifications

## Notes
- Sales number should follow a specific format (e.g., SL-YYYYMMDD-XXXX)
- Only approved sales invoices can be finalized
- Once finalized, the sales invoice status should be updated
- Keep audit trail of who finalized the sale and when
```
