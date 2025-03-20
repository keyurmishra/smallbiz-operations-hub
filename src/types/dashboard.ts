
export interface SalesDataPoint {
  name: string;
  sales: number;
  revenue: number;
}

export interface InventoryAlertItem {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
  threshold: number;
  status: 'critical' | 'low' | 'expired';
}

export interface SaleItem {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
  date: string;
}

export const sampleInventoryAlerts: InventoryAlertItem[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    category: 'Electronics',
    stockLevel: 2,
    threshold: 10,
    status: 'critical',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S22',
    category: 'Electronics',
    stockLevel: 5,
    threshold: 10,
    status: 'low',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    category: 'Audio',
    stockLevel: 3,
    threshold: 5,
    status: 'low',
  },
];

export const sampleRecentSales: SaleItem[] = [
  {
    id: '1',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    amount: 399.99,
    status: 'completed',
    date: 'Today, 2:30 PM',
  },
  {
    id: '2',
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    amount: 149.99,
    status: 'pending',
    date: 'Today, 11:15 AM',
  },
  {
    id: '3',
    customer: {
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
    },
    amount: 79.99,
    status: 'completed',
    date: 'Yesterday, 5:45 PM',
  },
  {
    id: '4',
    customer: {
      name: 'Emily Davis',
      email: 'emily.d@example.com',
    },
    amount: 199.99,
    status: 'refunded',
    date: 'Yesterday, 3:20 PM',
  },
];

export const sampleSalesData: SalesDataPoint[] = [
  { name: 'Jan', sales: 4000, revenue: 24000 },
  { name: 'Feb', sales: 3000, revenue: 18000 },
  { name: 'Mar', sales: 5000, revenue: 30000 },
  { name: 'Apr', sales: 2780, revenue: 16680 },
  { name: 'May', sales: 1890, revenue: 11340 },
  { name: 'Jun', sales: 2390, revenue: 14340 },
  { name: 'Jul', sales: 3490, revenue: 20940 },
];
