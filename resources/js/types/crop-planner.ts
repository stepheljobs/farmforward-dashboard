export interface CropType {
    id: number;
    name: string;
    is_active: boolean;
}

export interface Farmer {
    id: number;
    first_name: string;
    last_name: string;
}

export interface Consultant {
    id: number;
    name: string;
}

export interface CropPlanner {
    id: number;
    farmer_id: number;
    consultant_id: number;
    crop_type_id: number;
    planned_area_hectares: number;
    estimated_quantity: number;
    planned_planting_date: string;
    expected_harvest_date: string;
    consultant_notes?: string;
    location?: string;
    variety?: string;
    volume_inputs?: number;
    volume_inputs_type?: 'can' | 'plants' | 'lata' | 'kg' | 'seeds' | 'g';
    contact_number?: string;
    status: 'pending_farmer' | 'approved' | 'rejected';
    farmer_notes?: string;
    farmer_responded_at?: string;
    consultant_requested_at: string;
    created_at: string;
    updated_at: string;
    farmer: Farmer;
    consultant: Consultant;
    cropType: CropType;
} 