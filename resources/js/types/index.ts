export interface Employee {
  id: number;
  name: string;
  employee_id: number;
  position: string;
  email: string;
  phone_number: string;
  address: string;
  employment_status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Crop {
  id: number;
  name: string;
  variety: string;
  sku: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Buyer {
  id: number;
  name: string;
  buyer_id: string;
  phone_number: string;
  address: string;
  status: string;
  destination: string;
  created_at?: string;
  updated_at?: string;
} 