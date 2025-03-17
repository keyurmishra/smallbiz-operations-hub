
import { Employee, AttendanceRecord, PaymentRecord } from '@/types/employee';
import { format, subDays, subMonths } from 'date-fns';

// Helper to generate sample attendance records
const generateAttendanceRecords = (days: number): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const randomStatus = Math.random();
    let status: 'Present' | 'Absent' | 'Late' | 'Half-day';
    
    if (randomStatus > 0.8) status = 'Absent';
    else if (randomStatus > 0.7) status = 'Late';
    else if (randomStatus > 0.6) status = 'Half-day';
    else status = 'Present';
    
    records.push({
      date,
      status,
      checkInTime: status !== 'Absent' ? `0${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 59)}` : undefined,
      checkOutTime: status !== 'Absent' ? `${17 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 59)}` : undefined,
    });
  }
  return records;
};

// Helper to generate sample payment records
const generatePaymentRecords = (months: number): PaymentRecord[] => {
  const records: PaymentRecord[] = [];
  for (let i = 0; i < months; i++) {
    const currentMonth = subMonths(new Date(), i);
    const prevMonth = subMonths(currentMonth, 1);
    
    records.push({
      id: `PAY-${Math.floor(Math.random() * 10000)}`,
      date: format(currentMonth, 'yyyy-MM-dd'),
      amount: 2000 + Math.floor(Math.random() * 1000),
      paymentMode: ['Bank Transfer', 'Cash', 'Check', 'Digital Wallet'][Math.floor(Math.random() * 4)] as any,
      status: Math.random() > 0.9 ? 'Pending' : 'Completed',
      description: 'Monthly salary',
      period: {
        from: format(prevMonth, 'yyyy-MM-dd'),
        to: format(currentMonth, 'yyyy-MM-dd'),
      },
    });
  }
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    role: 'Store Manager',
    department: 'Management',
    joinDate: '2022-01-15',
    status: 'Active',
    address: '123 Main St, City, State',
    emergencyContact: 'John Johnson (Husband) - (555) 765-4321',
    attendance: generateAttendanceRecords(30),
    payments: generatePaymentRecords(6),
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 987-6543',
    role: 'Sales Associate',
    department: 'Sales',
    joinDate: '2022-03-10',
    status: 'Active',
    address: '456 Oak Ave, City, State',
    emergencyContact: 'Lisa Chen (Wife) - (555) 876-5432',
    attendance: generateAttendanceRecords(30),
    payments: generatePaymentRecords(6),
  },
  {
    id: '3',
    name: 'Jessica Taylor',
    email: 'jessica.taylor@example.com',
    phone: '(555) 765-4321',
    role: 'Inventory Specialist',
    department: 'Inventory',
    joinDate: '2022-02-20',
    status: 'Active',
    address: '789 Pine St, City, State',
    emergencyContact: 'Mark Taylor (Brother) - (555) 234-5678',
    attendance: generateAttendanceRecords(30),
    payments: generatePaymentRecords(6),
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '(555) 234-5678',
    role: 'Customer Service',
    department: 'Customer Support',
    joinDate: '2022-04-05',
    status: 'On Leave',
    address: '101 Maple Dr, City, State',
    emergencyContact: 'Emma Wilson (Wife) - (555) 345-6789',
    attendance: generateAttendanceRecords(30),
    payments: generatePaymentRecords(6),
  },
  {
    id: '5',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    phone: '(555) 876-5432',
    role: 'Assistant Manager',
    department: 'Management',
    joinDate: '2022-01-30',
    status: 'Active',
    address: '202 Cedar St, City, State',
    emergencyContact: 'Lucas Rodriguez (Husband) - (555) 987-6543',
    attendance: generateAttendanceRecords(30),
    payments: generatePaymentRecords(6),
  },
  {
    id: '6',
    name: 'James Brown',
    email: 'james.brown@example.com',
    phone: '(555) 345-6789',
    role: 'IT Support',
    department: 'IT',
    joinDate: '2022-05-15',
    status: 'Inactive',
    address: '303 Birch Ave, City, State',
    emergencyContact: 'Sophia Brown (Wife) - (555) 456-7890',
    attendance: generateAttendanceRecords(30),
    payments: generatePaymentRecords(6),
  },
];

// Function to get an employee by ID
export const getEmployeeById = (id: string): Employee | undefined => {
  return sampleEmployees.find(employee => employee.id === id);
};

// Function to update an employee's attendance for today
export const updateEmployeeAttendance = (
  employeeId: string, 
  status: 'Present' | 'Absent' | 'Late' | 'Half-day',
  note?: string
): Employee | undefined => {
  const employee = getEmployeeById(employeeId);
  if (!employee) return undefined;

  const today = format(new Date(), 'yyyy-MM-dd');
  const existingRecord = employee.attendance.find(record => record.date === today);
  
  if (existingRecord) {
    existingRecord.status = status;
    existingRecord.note = note;
    if (status !== 'Absent' && !existingRecord.checkInTime) {
      existingRecord.checkInTime = format(new Date(), 'HH:mm');
    }
  } else {
    employee.attendance.unshift({
      date: today,
      status,
      note,
      checkInTime: status !== 'Absent' ? format(new Date(), 'HH:mm') : undefined,
    });
  }
  
  return {...employee};
};

// Function to add a new payment record
export const addPaymentRecord = (
  employeeId: string,
  payment: Omit<PaymentRecord, 'id'>
): Employee | undefined => {
  const employee = getEmployeeById(employeeId);
  if (!employee) return undefined;
  
  const newPayment: PaymentRecord = {
    ...payment,
    id: `PAY-${Math.floor(Math.random() * 100000)}`,
  };
  
  employee.payments.unshift(newPayment);
  return {...employee};
};
