
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalSpent: number;
  lastPurchase: string;
  purchaseCount: number;
  customerType: 'regular' | 'vip' | 'new';
}
