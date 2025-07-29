// Demo data for the car wash application
export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  walletBalance: number;
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
}

export interface DemoBooking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: string;
  servicePrice: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'refunded';
  carMake: string;
  carModel: string;
  carYear: string;
  licensePlate: string;
  location: string;
  notes: string;
  paymentMethod: 'cash' | 'transfer' | 'wallet';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
  cancellationReason?: string;
  refundAmount?: number;
  refundDate?: string;
}

export interface DemoTransaction {
  id: string;
  userId: string;
  userName: string;
  type: 'booking' | 'refund' | 'wallet_recharge' | 'wallet_withdrawal';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  reference: string;
}

export interface DemoVehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  color: string;
  imageUrl?: string;
  isDefault: boolean;
  createdAt: string;
}

// Demo Users
export const demoUsers: DemoUser[] = [
  {
    id: 'user-1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+234 801 234 5678',
    role: 'user',
    walletBalance: 15000,
    joinDate: '2024-01-15',
    totalBookings: 8,
    totalSpent: 45000
  },
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+234 802 345 6789',
    role: 'user',
    walletBalance: 8500,
    joinDate: '2024-02-03',
    totalBookings: 5,
    totalSpent: 32000
  },
  {
    id: 'user-3',
    name: 'Michael Brown',
    email: 'mike.brown@email.com',
    phone: '+234 803 456 7890',
    role: 'user',
    walletBalance: 22000,
    joinDate: '2024-01-28',
    totalBookings: 12,
    totalSpent: 78000
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+234 804 567 8901',
    role: 'user',
    walletBalance: 5000,
    joinDate: '2024-03-10',
    totalBookings: 3,
    totalSpent: 15000
  },
  {
    id: 'user-5',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+234 805 678 9012',
    role: 'user',
    walletBalance: 18000,
    joinDate: '2024-02-20',
    totalBookings: 6,
    totalSpent: 38000
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@carwashpro.com',
    phone: '+234 800 000 0000',
    role: 'admin',
    walletBalance: 0,
    joinDate: '2024-01-01',
    totalBookings: 0,
    totalSpent: 0
  }
];

// Demo Vehicles
export const demoVehicles: DemoVehicle[] = [
  {
    id: 'vehicle-1',
    userId: 'user-1',
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    licensePlate: 'ABC123XY',
    color: 'Silver',
    isDefault: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'vehicle-2',
    userId: 'user-1',
    make: 'Honda',
    model: 'CR-V',
    year: '2022',
    licensePlate: 'DEF456ZW',
    color: 'Black',
    isDefault: false,
    createdAt: '2024-02-10'
  },
  {
    id: 'vehicle-3',
    userId: 'user-2',
    make: 'BMW',
    model: 'X5',
    year: '2021',
    licensePlate: 'GHI789AB',
    color: 'White',
    isDefault: true,
    createdAt: '2024-02-03'
  },
  {
    id: 'vehicle-4',
    userId: 'user-3',
    make: 'Mercedes',
    model: 'C-Class',
    year: '2023',
    licensePlate: 'JKL012CD',
    color: 'Blue',
    isDefault: true,
    createdAt: '2024-01-28'
  },
  {
    id: 'vehicle-5',
    userId: 'user-4',
    make: 'Audi',
    model: 'A4',
    year: '2022',
    licensePlate: 'MNO345EF',
    color: 'Red',
    isDefault: true,
    createdAt: '2024-03-10'
  },
  {
    id: 'vehicle-6',
    userId: 'user-5',
    make: 'Lexus',
    model: 'RX',
    year: '2021',
    licensePlate: 'PQR678GH',
    color: 'Gray',
    isDefault: true,
    createdAt: '2024-02-20'
  }
];

// Demo Bookings
export const demoBookings: DemoBooking[] = [
  {
    id: 'booking-1',
    userId: 'user-1',
    userName: 'John Smith',
    userEmail: 'john.smith@email.com',
    userPhone: '+234 801 234 5678',
    service: 'Premium Wash',
    servicePrice: 5000,
    date: '2024-12-20',
    time: '10:00 AM',
    status: 'completed',
    carMake: 'Toyota',
    carModel: 'Camry',
    carYear: '2020',
    licensePlate: 'ABC123XY',
    location: 'Lagos Mainland',
    notes: 'Please pay extra attention to the wheels',
    paymentMethod: 'wallet',
    paymentStatus: 'paid',
    createdAt: '2024-12-18T10:30:00Z',
    updatedAt: '2024-12-20T11:30:00Z'
  },
  {
    id: 'booking-2',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@email.com',
    userPhone: '+234 802 345 6789',
    service: 'Full Detailing',
    servicePrice: 8500,
    date: '2024-12-21',
    time: '2:00 PM',
    status: 'confirmed',
    carMake: 'BMW',
    carModel: 'X5',
    carYear: '2021',
    licensePlate: 'GHI789AB',
    location: 'Victoria Island',
    notes: 'Interior needs deep cleaning',
    paymentMethod: 'transfer',
    paymentStatus: 'paid',
    createdAt: '2024-12-19T14:15:00Z',
    updatedAt: '2024-12-19T16:45:00Z'
  },
  {
    id: 'booking-3',
    userId: 'user-3',
    userName: 'Michael Brown',
    userEmail: 'mike.brown@email.com',
    userPhone: '+234 803 456 7890',
    service: 'Basic Wash',
    servicePrice: 2500,
    date: '2024-12-19',
    time: '9:00 AM',
    status: 'cancelled',
    carMake: 'Mercedes',
    carModel: 'C-Class',
    carYear: '2023',
    licensePlate: 'JKL012CD',
    location: 'Ikeja',
    notes: '',
    paymentMethod: 'cash',
    paymentStatus: 'refunded',
    createdAt: '2024-12-17T08:20:00Z',
    updatedAt: '2024-12-18T15:30:00Z',
    cancellationReason: 'Customer requested cancellation due to schedule conflict',
    refundAmount: 2500,
    refundDate: '2024-12-18T16:00:00Z'
  },
  {
    id: 'booking-4',
    userId: 'user-4',
    userName: 'Emily Davis',
    userEmail: 'emily.davis@email.com',
    userPhone: '+234 804 567 8901',
    service: 'Premium Wash',
    servicePrice: 5000,
    date: '2024-12-22',
    time: '11:00 AM',
    status: 'pending',
    carMake: 'Audi',
    carModel: 'A4',
    carYear: '2022',
    licensePlate: 'MNO345EF',
    location: 'Lekki',
    notes: 'First time customer',
    paymentMethod: 'wallet',
    paymentStatus: 'pending',
    createdAt: '2024-12-20T09:45:00Z',
    updatedAt: '2024-12-20T09:45:00Z'
  },
  {
    id: 'booking-5',
    userId: 'user-5',
    userName: 'David Wilson',
    userEmail: 'david.wilson@email.com',
    userPhone: '+234 805 678 9012',
    service: 'Full Detailing',
    servicePrice: 8500,
    date: '2024-12-23',
    time: '3:00 PM',
    status: 'in-progress',
    carMake: 'Lexus',
    carModel: 'RX',
    carYear: '2021',
    licensePlate: 'PQR678GH',
    location: 'Surulere',
    notes: 'Car has been in storage for 3 months',
    paymentMethod: 'transfer',
    paymentStatus: 'paid',
    createdAt: '2024-12-20T11:20:00Z',
    updatedAt: '2024-12-23T14:15:00Z'
  },
  {
    id: 'booking-6',
    userId: 'user-1',
    userName: 'John Smith',
    userEmail: 'john.smith@email.com',
    userPhone: '+234 801 234 5678',
    service: 'Basic Wash',
    servicePrice: 2500,
    date: '2024-12-24',
    time: '10:30 AM',
    status: 'confirmed',
    carMake: 'Honda',
    carModel: 'CR-V',
    carYear: '2022',
    licensePlate: 'DEF456ZW',
    location: 'Lagos Mainland',
    notes: '',
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    createdAt: '2024-12-21T13:10:00Z',
    updatedAt: '2024-12-21T14:30:00Z'
  },
  {
    id: 'booking-7',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@email.com',
    userPhone: '+234 802 345 6789',
    service: 'Premium Wash',
    servicePrice: 5000,
    date: '2024-12-25',
    time: '1:00 PM',
    status: 'pending',
    carMake: 'BMW',
    carModel: 'X5',
    carYear: '2021',
    licensePlate: 'GHI789AB',
    location: 'Victoria Island',
    notes: 'Christmas special request',
    paymentMethod: 'wallet',
    paymentStatus: 'pending',
    createdAt: '2024-12-22T16:45:00Z',
    updatedAt: '2024-12-22T16:45:00Z'
  },
  {
    id: 'booking-8',
    userId: 'user-3',
    userName: 'Michael Brown',
    userEmail: 'mike.brown@email.com',
    userPhone: '+234 803 456 7890',
    service: 'Full Detailing',
    servicePrice: 8500,
    date: '2024-12-26',
    time: '9:00 AM',
    status: 'pending',
    carMake: 'Mercedes',
    carModel: 'C-Class',
    carYear: '2023',
    licensePlate: 'JKL012CD',
    location: 'Ikeja',
    notes: 'Pre-holiday cleaning',
    paymentMethod: 'transfer',
    paymentStatus: 'pending',
    createdAt: '2024-12-23T10:30:00Z',
    updatedAt: '2024-12-23T10:30:00Z'
  }
];

// Demo Transactions
export const demoTransactions: DemoTransaction[] = [
  {
    id: 'txn-1',
    userId: 'user-1',
    userName: 'John Smith',
    type: 'booking',
    amount: -5000,
    description: 'Premium Wash - Booking #booking-1',
    status: 'completed',
    date: '2024-12-18T10:30:00Z',
    reference: 'TXN-001'
  },
  {
    id: 'txn-2',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    type: 'booking',
    amount: -8500,
    description: 'Full Detailing - Booking #booking-2',
    status: 'completed',
    date: '2024-12-19T14:15:00Z',
    reference: 'TXN-002'
  },
  {
    id: 'txn-3',
    userId: 'user-3',
    userName: 'Michael Brown',
    type: 'booking',
    amount: -2500,
    description: 'Basic Wash - Booking #booking-3',
    status: 'completed',
    date: '2024-12-17T08:20:00Z',
    reference: 'TXN-003'
  },
  {
    id: 'txn-4',
    userId: 'user-3',
    userName: 'Michael Brown',
    type: 'refund',
    amount: 2500,
    description: 'Refund for cancelled booking #booking-3',
    status: 'completed',
    date: '2024-12-18T16:00:00Z',
    reference: 'REF-001'
  },
  {
    id: 'txn-5',
    userId: 'user-5',
    userName: 'David Wilson',
    type: 'booking',
    amount: -8500,
    description: 'Full Detailing - Booking #booking-5',
    status: 'completed',
    date: '2024-12-20T11:20:00Z',
    reference: 'TXN-004'
  },
  {
    id: 'txn-6',
    userId: 'user-1',
    userName: 'John Smith',
    type: 'wallet_recharge',
    amount: 20000,
    description: 'Wallet recharge',
    status: 'completed',
    date: '2024-12-15T09:00:00Z',
    reference: 'RCH-001'
  },
  {
    id: 'txn-7',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    type: 'wallet_recharge',
    amount: 15000,
    description: 'Wallet recharge',
    status: 'completed',
    date: '2024-12-16T14:30:00Z',
    reference: 'RCH-002'
  },
  {
    id: 'txn-8',
    userId: 'user-3',
    userName: 'Michael Brown',
    type: 'wallet_recharge',
    amount: 30000,
    description: 'Wallet recharge',
    status: 'completed',
    date: '2024-12-14T11:15:00Z',
    reference: 'RCH-003'
  }
];

// Service definitions
export const services = [
  {
    id: 'basic-wash',
    name: 'Basic Wash',
    price: 2500,
    description: 'Exterior wash, tire cleaning, and basic interior wipe',
    duration: '30-45 minutes',
    features: ['Exterior wash', 'Tire cleaning', 'Basic interior wipe', 'Window cleaning']
  },
  {
    id: 'premium-wash',
    name: 'Premium Wash',
    price: 5000,
    description: 'Comprehensive exterior and interior cleaning',
    duration: '60-90 minutes',
    features: ['Exterior wash', 'Tire & wheel cleaning', 'Interior vacuum', 'Dashboard cleaning', 'Window cleaning', 'Air freshener']
  },
  {
    id: 'full-detailing',
    name: 'Full Detailing',
    price: 8500,
    description: 'Complete professional detailing service',
    duration: '2-3 hours',
    features: ['Exterior wash', 'Clay bar treatment', 'Wax application', 'Interior deep cleaning', 'Leather treatment', 'Engine bay cleaning', 'Tire dressing']
  }
];

// Locations
export const locations = [
  'Lagos Mainland',
  'Victoria Island',
  'Ikeja',
  'Lekki',
  'Surulere',
  'Yaba',
  'Oshodi',
  'Alimosho'
];

// Time slots
export const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM'
];

// Export all demo data
export const demoData = {
  users: demoUsers,
  bookings: demoBookings,
  transactions: demoTransactions,
  vehicles: demoVehicles,
  services,
  locations,
  timeSlots
}; 