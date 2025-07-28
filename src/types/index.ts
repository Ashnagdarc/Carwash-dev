export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
  role: 'customer' | 'admin' | 'provider';
}

export interface Car {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  car_type: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'truck';
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'basic' | 'premium' | 'deluxe';
  features: string[];
  active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  car_id: string;
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  latitude?: number;
  longitude?: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  total_amount: number;
  special_instructions?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  payment_method: 'paystack';
  transaction_reference: string;
  status: 'pending' | 'successful' | 'failed';
  created_at: string;
}