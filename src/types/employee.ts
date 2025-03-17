
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  address?: string;
  emergencyContact?: string;
  salary?: number;
  employeeId?: string;
  manager?: string;
  skills?: string[];
  education?: string;
  birthDate?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  attendance: AttendanceRecord[];
  payments: PaymentRecord[];
}

export interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half-day';
  checkInTime?: string;
  checkOutTime?: string;
  note?: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  paymentMode: 'Bank Transfer' | 'Cash' | 'Check' | 'Digital Wallet';
  status: 'Pending' | 'Completed' | 'Failed';
  description?: string;
  period?: {
    from: string;
    to: string;
  };
  taxDeduction?: number;
  bonusAmount?: number;
  overtimeHours?: number;
  overtimeRate?: number;
}
