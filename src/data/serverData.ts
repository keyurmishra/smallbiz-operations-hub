
import { LayoutDashboard, PlusCircle } from 'lucide-react';
import { ReactNode } from 'react';

export interface Server {
  id: number;
  label: string;
  icon: ReactNode | string;
  isHome?: boolean;
  notifications?: number;
}

export const servers: Server[] = [
  { id: 0, label: "Home", icon: <LayoutDashboard size={24} />, isHome: true },
  { id: 1, label: "Shop Monitor", icon: "SM", notifications: 3 },
  { id: 2, label: "Inventory", icon: "IN" },
  { id: 3, label: "Sales", icon: "SA" },
  { id: 4, label: "Analytics", icon: "AN" },
  { id: 5, label: "Add Server", icon: <PlusCircle size={24} /> }
];
