
import { 
  Bell, 
  Hash, 
  Package, 
  ShoppingCart,
  CreditCard,
  Receipt,
  Users,
  UserCog,
  BarChart3,
  MessageSquare,
  Settings
} from 'lucide-react';
import { ReactNode } from 'react';

export interface ChannelItem {
  id: string;
  label: string;
  icon: ReactNode;
  to: string;
  notifications?: number;
}

export interface ChannelCategory {
  category: string;
  items: ChannelItem[];
}

export const channels: ChannelCategory[] = [
  { 
    category: "SHOP INFORMATION",
    items: [
      { id: 'announcements', label: 'Announcements', icon: <Bell size={18} />, to: '/' },
      { id: 'general', label: 'General', icon: <Hash size={18} />, to: '/', notifications: 5 },
      { id: 'inventory', label: 'Inventory', icon: <Package size={18} />, to: '/inventory' }
    ]
  },
  {
    category: "SALES",
    items: [
      { id: 'sales-general', label: 'Sales Dashboard', icon: <ShoppingCart size={18} />, to: '/sales' },
      { id: 'pos', label: 'Point of Sale', icon: <CreditCard size={18} />, to: '/pos' },
      { id: 'invoices', label: 'Invoices', icon: <Receipt size={18} />, to: '/billing' }
    ]
  },
  {
    category: "PEOPLE",
    items: [
      { id: 'customers', label: 'Customers', icon: <Users size={18} />, to: '/customers' },
      { id: 'employees', label: 'Employees', icon: <UserCog size={18} />, to: '/employees' }
    ]
  },
  {
    category: "DATA",
    items: [
      { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} />, to: '/analytics' },
      { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} />, to: '/more', notifications: 2 },
      { id: 'settings', label: 'Settings', icon: <Settings size={18} />, to: '/settings' }
    ]
  }
];
