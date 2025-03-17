
import { Employee, AttendanceRecord, PaymentRecord } from '@/types/employee';
import { format, subDays, subMonths, addDays } from 'date-fns';

// Helper to generate sample attendance records
const generateAttendanceRecords = (days: number, reliability: number = 0.9): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const randomStatus = Math.random();
    let status: 'Present' | 'Absent' | 'Late' | 'Half-day';
    
    // Adjust attendance based on reliability factor
    if (randomStatus > reliability * 0.9) status = 'Absent';
    else if (randomStatus > reliability * 0.8) status = 'Late';
    else if (randomStatus > reliability * 0.7) status = 'Half-day';
    else status = 'Present';
    
    records.push({
      date,
      status,
      checkInTime: status !== 'Absent' ? `0${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}` : undefined,
      checkOutTime: status !== 'Absent' ? `${17 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}` : undefined,
    });
  }
  return records;
};

// Helper to generate sample payment records
const generatePaymentRecords = (months: number, baseSalary: number): PaymentRecord[] => {
  const records: PaymentRecord[] = [];
  for (let i = 0; i < months; i++) {
    const currentMonth = subMonths(new Date(), i);
    const prevMonth = subMonths(currentMonth, 1);
    
    // Add some variation to salary
    const bonusAmount = Math.random() > 0.7 ? Math.floor(baseSalary * 0.1 * Math.random()) : 0;
    const overtimeHours = Math.floor(Math.random() * 20);
    const overtimeRate = 20;
    const taxDeduction = Math.floor(baseSalary * 0.15 * (0.9 + Math.random() * 0.2));
    
    records.push({
      id: `PAY-${Math.floor(Math.random() * 100000)}`,
      date: format(currentMonth, 'yyyy-MM-dd'),
      amount: baseSalary + bonusAmount + (overtimeHours * overtimeRate),
      paymentMode: ['Bank Transfer', 'Cash', 'Check', 'Digital Wallet'][Math.floor(Math.random() * 4)] as any,
      status: Math.random() > 0.9 ? 'Pending' : 'Completed',
      description: 'Monthly salary',
      period: {
        from: format(prevMonth, 'yyyy-MM-dd'),
        to: format(currentMonth, 'yyyy-MM-dd'),
      },
      taxDeduction,
      bonusAmount,
      overtimeHours,
      overtimeRate
    });
  }
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// List of departments
const departments = [
  'Management', 'Sales', 'Customer Support', 'Marketing', 'IT', 'Finance', 
  'Human Resources', 'Operations', 'Research & Development', 'Legal', 
  'Product Management', 'Quality Assurance', 'Inventory'
];

// List of roles by department
const roles: Record<string, string[]> = {
  'Management': ['CEO', 'COO', 'CFO', 'CTO', 'Store Manager', 'Assistant Manager', 'Regional Manager', 'Department Head'],
  'Sales': ['Sales Director', 'Sales Manager', 'Senior Sales Representative', 'Sales Representative', 'Sales Associate', 'Business Development Manager'],
  'Marketing': ['Marketing Director', 'Marketing Manager', 'Marketing Specialist', 'Digital Marketing Specialist', 'Content Creator', 'SEO Specialist'],
  'IT': ['IT Director', 'IT Manager', 'Systems Administrator', 'Software Developer', 'Network Engineer', 'IT Support', 'Database Administrator'],
  'Customer Support': ['Customer Service Manager', 'Customer Service Representative', 'Customer Success Manager', 'Technical Support Specialist'],
  'Finance': ['Finance Manager', 'Accountant', 'Financial Analyst', 'Payroll Specialist', 'Bookkeeper'],
  'Human Resources': ['HR Director', 'HR Manager', 'HR Specialist', 'Recruiter', 'Training Coordinator'],
  'Operations': ['Operations Manager', 'Operations Coordinator', 'Project Manager', 'Process Improvement Specialist'],
  'Research & Development': ['R&D Director', 'Product Designer', 'Research Analyst', 'Innovation Specialist'],
  'Legal': ['Legal Counsel', 'Compliance Officer', 'Legal Assistant'],
  'Product Management': ['Product Manager', 'Product Owner', 'Product Analyst'],
  'Quality Assurance': ['QA Manager', 'QA Analyst', 'QA Tester'],
  'Inventory': ['Inventory Manager', 'Inventory Specialist', 'Stock Clerk', 'Warehouse Manager', 'Logistics Coordinator']
};

// List of sample first names
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
  'David', 'Susan', 'Richard', 'Jessica', 'Joseph', 'Sarah', 'Thomas', 'Karen', 'Charles', 'Nancy',
  'Christopher', 'Lisa', 'Daniel', 'Margaret', 'Matthew', 'Betty', 'Anthony', 'Sandra', 'Mark', 'Ashley',
  'Donald', 'Kimberly', 'Steven', 'Emily', 'Paul', 'Donna', 'Andrew', 'Michelle', 'Joshua', 'Carol',
  'Kenneth', 'Amanda', 'Kevin', 'Melissa', 'Brian', 'Deborah', 'George', 'Stephanie', 'Timothy', 'Rebecca',
  'Ronald', 'Laura', 'Jason', 'Sharon', 'Edward', 'Cynthia', 'Jeffrey', 'Kathleen', 'Ryan', 'Amy',
  'Jacob', 'Shirley', 'Gary', 'Anna', 'Nicholas', 'Angela', 'Eric', 'Ruth', 'Jonathan', 'Brenda',
  'Stephen', 'Pamela', 'Larry', 'Nicole', 'Justin', 'Katherine', 'Scott', 'Virginia', 'Brandon', 'Catherine',
  'Benjamin', 'Christine', 'Samuel', 'Samantha', 'Gregory', 'Debra', 'Alexander', 'Janet', 'Patrick', 'Rachel',
  'Frank', 'Carolyn', 'Raymond', 'Emma', 'Jack', 'Maria', 'Dennis', 'Heather', 'Jerry', 'Diane'
];

// List of sample last names
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
  'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'
];

// Generate 50 employees
export const generateEmployees = (count: number = 50): Employee[] => {
  const employees: Employee[] = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    const department = departments[Math.floor(Math.random() * departments.length)];
    const departmentRoles = roles[department] || roles['Sales'];
    const role = departmentRoles[Math.floor(Math.random() * departmentRoles.length)];
    
    // Generate random join date between 5 years ago and 1 month ago
    const joinDateOffset = Math.floor(Math.random() * (5 * 365 - 30) + 30);
    const joinDate = format(subDays(new Date(), joinDateOffset), 'yyyy-MM-dd');
    
    // Calculate base salary based on role and department (just for demo purposes)
    const baseSalary = 2000 + (Math.floor(Math.random() * 3000));
    
    // Generate an employee ID with format EMP-XXXXX
    const employeeId = `EMP-${(10000 + i).toString()}`;
    
    // Generate a random birth date for someone between 23 and 60 years old
    const ageInDays = Math.floor(Math.random() * (60 - 23) * 365) + 23 * 365;
    const birthDate = format(subDays(new Date(), ageInDays), 'yyyy-MM-dd');
    
    // Generate a random gender
    const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
    const gender = genders[Math.floor(Math.random() * genders.length)] as any;
    
    // Generate random employee status with appropriate weights
    const statusRand = Math.random();
    let status: 'Active' | 'On Leave' | 'Inactive';
    if (statusRand > 0.9) status = 'Inactive';
    else if (statusRand > 0.75) status = 'On Leave';
    else status = 'Active';
    
    // Generate attendance reliability based on employee status
    const reliability = status === 'Active' ? 0.7 + (Math.random() * 0.3) : 0.5 + (Math.random() * 0.3);
    
    employees.push({
      id: i.toString(),
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      role,
      department,
      joinDate,
      status,
      salary: baseSalary,
      employeeId,
      address: `${Math.floor(Math.random() * 999) + 1} ${['Main', 'Oak', 'Maple', 'Cedar', 'Pine', 'Elm', 'Washington', 'Jefferson'][Math.floor(Math.random() * 8)]} ${['St', 'Ave', 'Blvd', 'Rd', 'Ln', 'Dr'][Math.floor(Math.random() * 6)]}, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'][Math.floor(Math.random() * 8)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ', 'PA'][Math.floor(Math.random() * 6)]}`,
      emergencyContact: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]} (${['Spouse', 'Parent', 'Sibling', 'Friend'][Math.floor(Math.random() * 4)]}) - ${`(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`}`,
      attendance: generateAttendanceRecords(30, reliability),
      payments: generatePaymentRecords(6, baseSalary),
      birthDate,
      gender,
      education: ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'][Math.floor(Math.random() * 5)],
      skills: ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Customer Service', 'Technical Skills', 'Project Management', 'Time Management', 'Adaptability', 'Critical Thinking']
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 2)
    });
  }
  
  return employees;
};

// Generate 50 employees
export const sampleEmployees: Employee[] = generateEmployees(50);

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

// Sample sales data
export interface SaleRecord {
  id: string;
  date: string;
  customer: {
    id: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  employee: {
    id: string;
    name: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  paymentMethod: 'Credit Card' | 'Cash' | 'Bank Transfer' | 'Digital Wallet' | 'Check';
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
  status: 'Completed' | 'Pending' | 'Cancelled' | 'Refunded';
  notes?: string;
}

// Sample products
const products = [
  { id: 'P1', name: 'Smartphone X', price: 899 },
  { id: 'P2', name: 'Laptop Pro', price: 1299 },
  { id: 'P3', name: 'Wireless Headphones', price: 249 },
  { id: 'P4', name: 'Smart Watch', price: 399 },
  { id: 'P5', name: 'Tablet Lite', price: 549 },
  { id: 'P6', name: 'Bluetooth Speaker', price: 129 },
  { id: 'P7', name: 'Gaming Console', price: 499 },
  { id: 'P8', name: 'Digital Camera', price: 799 },
  { id: 'P9', name: 'Wireless Mouse', price: 59 },
  { id: 'P10', name: 'Mechanical Keyboard', price: 149 },
  { id: 'P11', name: 'External SSD', price: 189 },
  { id: 'P12', name: 'Monitor 4K', price: 349 },
  { id: 'P13', name: 'Graphics Card', price: 699 },
  { id: 'P14', name: 'Wireless Router', price: 129 },
  { id: 'P15', name: 'Fitness Tracker', price: 99 },
  { id: 'P16', name: 'Printer All-in-One', price: 299 },
  { id: 'P17', name: 'Portable Charger', price: 49 },
  { id: 'P18', name: 'Smart Home Hub', price: 179 },
  { id: 'P19', name: 'Desk Lamp', price: 39 },
  { id: 'P20', name: 'Office Chair', price: 249 }
];

// Sample company names
const companies = [
  'Tech Solutions Inc.', 'Global Innovations', 'Future Systems', 'Smart Tech Co.',
  'Digital Dynamics', 'Pinnacle Technologies', 'Innovative Solutions', 'Strategic Systems',
  'Modern Enterprises', 'Elite Services', 'Prime Corporation', 'Advanced Technologies',
  'Superior Products', 'Excel Industries', 'Premium Solutions', 'Summit Corp.',
  'Optimum Services', 'Precision Technologies', 'Quality Systems', 'Reliable Solutions'
];

// Sample customer data
const generateCustomers = (count: number) => {
  const customers = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    customers.push({
      id: `C${i}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${Math.random() > 0.5 ? 'example.com' : 'company.com'}`,
      company: Math.random() > 0.3 ? companies[Math.floor(Math.random() * companies.length)] : undefined,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    });
  }
  
  return customers;
};

const customers = generateCustomers(30);

// Generate sales data
export const generateSalesData = (count: number = 50): SaleRecord[] => {
  const sales: SaleRecord[] = [];
  
  for (let i = 1; i <= count; i++) {
    // Random date within past year
    const daysAgo = Math.floor(Math.random() * 365);
    const date = format(subDays(new Date(), daysAgo), 'yyyy-MM-dd');
    
    // Random customer
    const customer = customers[Math.floor(Math.random() * customers.length)];
    
    // Random employee
    const employee = sampleEmployees[Math.floor(Math.random() * sampleEmployees.length)];
    
    // Generate items
    const numItems = Math.floor(Math.random() * 5) + 1;
    const items = [];
    let subtotal = 0;
    
    const productsCopy = [...products];
    for (let j = 0; j < numItems; j++) {
      // Select a random product and remove it from the array to avoid duplicates
      const productIndex = Math.floor(Math.random() * productsCopy.length);
      const product = productsCopy.splice(productIndex, 1)[0];
      
      const quantity = Math.floor(Math.random() * 3) + 1;
      const total = product.price * quantity;
      
      items.push({
        id: product.id,
        name: product.name,
        quantity,
        price: product.price,
        total
      });
      
      subtotal += total;
    }
    
    // Calculate tax, discount, and total
    const tax = Math.round(subtotal * 0.0825 * 100) / 100; // 8.25% tax rate
    const discount = Math.random() > 0.7 ? Math.round(subtotal * (Math.random() * 0.15) * 100) / 100 : 0;
    const total = subtotal + tax - discount;
    
    // Payment method
    const paymentMethods = ['Credit Card', 'Cash', 'Bank Transfer', 'Digital Wallet', 'Check'];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)] as any;
    
    // Status
    const statusRand = Math.random();
    let status: 'Completed' | 'Pending' | 'Cancelled' | 'Refunded';
    if (statusRand > 0.95) status = 'Refunded';
    else if (statusRand > 0.9) status = 'Cancelled';
    else if (statusRand > 0.8) status = 'Pending';
    else status = 'Completed';
    
    sales.push({
      id: `SALE-${(10000 + i).toString()}`,
      date,
      customer,
      employee: {
        id: employee.id,
        name: employee.name
      },
      items,
      paymentMethod,
      subtotal,
      tax,
      discount,
      total,
      status,
      notes: Math.random() > 0.8 ? 'Customer requested expedited shipping' : undefined
    });
  }
  
  // Sort by date, newest first
  return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const sampleSales: SaleRecord[] = generateSalesData(50);

// Function to get a sale by ID
export const getSaleById = (id: string): SaleRecord | undefined => {
  return sampleSales.find(sale => sale.id === id);
};
