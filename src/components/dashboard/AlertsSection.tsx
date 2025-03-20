
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import InventoryAlert from '@/components/dashboard/InventoryAlert';
import RecentSales from '@/components/dashboard/RecentSales';

interface AlertsSectionProps {
  inventoryAlerts: Array<{
    id: string;
    name: string;
    category: string;
    stockLevel: number;
    threshold: number;
    status: 'critical' | 'low' | 'expired';
  }>;
  recentSales: Array<{
    id: string;
    customer: {
      name: string;
      email: string;
    };
    amount: number;
    status: 'completed' | 'pending' | 'refunded';
    date: string;
  }>;
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ inventoryAlerts, recentSales }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <DashboardCard title="Inventory Alerts" description="Low and out of stock items">
        <InventoryAlert items={inventoryAlerts} />
      </DashboardCard>
      <DashboardCard title="Recent Sales" description="Latest transactions">
        <RecentSales sales={recentSales} />
      </DashboardCard>
    </div>
  );
};

export default AlertsSection;
