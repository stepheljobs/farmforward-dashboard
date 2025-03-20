export interface SalesInvoiceItem {
    id: number;
    crop_arrival_stub: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    crop_type: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface Buyer {
    id: number;
    name: string;
    // Add other buyer fields as needed
}

export interface SalesInvoice {
    id: number;
    invoice_number: string;
    date: string;
    buyer_id: number;
    buyer: Buyer;
    subtotal: number;
    tax: number;
    total_amount: number;
    status: 'draft' | 'pending' | 'completed' | 'cancelled';
    payment_status: 'pending' | 'partial' | 'paid';
    items: SalesInvoiceItem[];
    created_at: string;
    updated_at: string;
} 