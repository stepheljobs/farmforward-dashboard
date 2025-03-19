# Sales Invoice System Documentation

## 1. Data Models

### CropArrival (Existing)
```typescript
interface CropArrival {
    stub_no: string;          // Primary identifier
    farmer: Farmer;
    field: Field;
    crop_type: CropType;
    received_date: Date;
    quantity_good: number;
    quantity_semi: number;
    quantity_reject: number;
    status: 'available' | 'partially_sold' | 'sold';  // New field to track inventory
}
```

### New Sales Invoice Model
```typescript
interface SalesInvoice {
    id: string;
    invoice_number: string;    // Auto-generated (e.g., SI-2024-0001)
    date: Date;
    items: SalesInvoiceItem[];
    subtotal: number;
    tax?: number;
    total_amount: number;
    status: 'draft' | 'final' | 'void';
    payment_status: 'pending' | 'partial' | 'paid';
    created_at: Date;
    updated_at: Date;
}

interface SalesInvoiceItem {
    id: string;
    sales_invoice_id: string;
    crop_arrival_stub: string;  // Reference to CropArrival
    quantity: number;
    unit_price: number;
    total_price: number;
    crop_type: string;         // For quick reference
    notes?: string;
}
```

## 2. Business Process Flow

### A. Invoice Creation
1. **Initiate Sale**
   - Create new draft invoice
   - Generate temporary invoice number

2. **Add Items**
   - Scan/enter crop arrival stub numbers
   - System validates:
     - Crop availability
     - Remaining quantity
   - Enter quantity and price
   - Calculate line item total

3. **Finalize Invoice**
   - Calculate subtotal and total
   - Generate final invoice number
   - Update status to 'final'
   - Update CropArrival status

## 3. User Interface Components

### A. Sales Invoice Creation Screen
```typescript
interface SalesInvoiceFormData {
    items: {
        stub_no: string;
        quantity: number;
        unit_price: number;
    }[];
}
```

### B. Key Features
1. **Stub Number Scanner/Input**
   - Quick lookup of crop arrivals
   - Display available quantities
   - Show crop type and details

2. **Dynamic Pricing Section**
   - Unit price input
   - Automatic total calculation
   - Running subtotal

3. **Invoice Preview**
   - Professional layout
   - All relevant details
   - Print-ready format

## 4. API Endpoints

```typescript
// Core endpoints
POST   /api/sales-invoices           // Create draft invoice
PUT    /api/sales-invoices/:id       // Update invoice
POST   /api/sales-invoices/:id/final // Finalize invoice
GET    /api/sales-invoices/:id       // Get invoice details

// Supporting endpoints
GET    /api/crop-arrivals/available  // List available crops
GET    /api/crop-arrivals/:stub_no   // Get crop details
```

## 5. Validation Rules

1. **Quantity Validation**
   - Cannot exceed available quantity
   - Must be greater than 0
   - Must be whole numbers

2. **Price Validation**
   - Must be greater than 0
   - Maximum 2 decimal places

3. **Status Validation**
   - Cannot modify finalized invoices
   - Cannot sell already sold crops

## 6. Implementation Phases

### Phase 1: Core Structure
- Database schema setup
- Basic CRUD operations
- Invoice number generation

## 7. Database Schema

```sql
CREATE TABLE sales_invoices (
    id UUID PRIMARY KEY,
    invoice_number VARCHAR(20) UNIQUE,
    date TIMESTAMP,
    buyer_id UUID,
    subtotal DECIMAL(10,2),
    tax DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    status VARCHAR(20),
    payment_status VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE sales_invoice_items (
    id UUID PRIMARY KEY,
    sales_invoice_id UUID,
    crop_arrival_stub VARCHAR(50),
    quantity INTEGER,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(10,2),
    crop_type VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (sales_invoice_id) REFERENCES sales_invoices(id),
    FOREIGN KEY (crop_arrival_stub) REFERENCES crop_arrivals(stub_no)
);
```
