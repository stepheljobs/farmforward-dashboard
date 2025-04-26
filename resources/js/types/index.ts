export interface Employee {
  id: number;
  last_name: string;
  first_name: string;
  middle_initial: string | null;
  employee_id: number;
  position: string;
  email: string;
  phone_number: string;
  address_sitio: string;
  address_barangay: string;
  address_city: string;
  address_province: string;
  employment_status: string;
  date_hired: string;
  date_separated: string | null;
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
  nickname?: string;
  last_name: string;
  first_name: string;
  middle_initial?: string;
  full_name: string; // This is a virtual attribute
  buyer_id: string;
  birthdate?: string;
  email?: string;
  phone_number?: string;
  sitio_purok_subdivision?: string;
  barangay?: string;
  city_municipality?: string;
  province?: string;
  complete_address: string; // This is a virtual attribute
  status: string;
  destination?: string;
  created_at?: string;
  updated_at?: string;
} 