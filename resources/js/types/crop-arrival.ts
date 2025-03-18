export interface CropArrival {
    id: number;
    stub_no: string;
    received_date: string;
    farmer_id: number;
    field_id: number;
    crop_type_id: number;
    quantity_good: number;
    quantity_semi: number;
    quantity_reject: number;
    receipt_id?: string;
    receipt_name?: string;
    created_at: string;
    updated_at: string;
    farmer: {
        id: number;
        first_name: string;
        last_name: string;
    };
    field: {
        id: number;
        name: string;
    };
    cropType: {
        id: number;
        name: string;
    };
}

interface Field {
    id: number;
    name: string;
} 