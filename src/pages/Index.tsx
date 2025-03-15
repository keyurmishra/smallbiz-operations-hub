
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import InventoryAlert from '@/components/dashboard/InventoryAlert';
import RecentSales from '@/components/dashboard/RecentSales';
import SalesChart from '@/components/dashboard/SalesChart';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react';

const Index = () => {
  // Sample data for dashboard
  const inventoryAlerts = [
    {
      id: '1',
      name: 'iPhone 14 Pro',
      category: 'Electronics',
      stockLevel: 2,
      threshold: 10,
      status: 'critical' as const,
    },
    {
      id: '2',
      name: 'Samsung Galaxy S22',
      category: 'Electronics',
      stockLevel: 5,
      threshold: 10,
      status: 'low' as const,
    },
    {
      id: '3',
      name: 'Sony WH-1000XM4',
      category: 'Audio',
      stockLevel: 3,
      threshold: 5,
      status: 'low' as const,
    },
  ];

  const recentSales = [
    {
      id: '1',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      amount: 399.99,
      status: 'completed' as const,
      date: 'Today, 2:30 PM',
    },
    {
      id: '2',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
      amount: 149.99,
      status: 'pending' as const,
      date: 'Today, 11:15 AM',
    },
    {
      id: '3',
      customer: {
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
      },
      amount: 79.99,
      status: 'completed' as const,
      date: 'Yesterday, 5:45 PM',
    },
    {
      id: '4',
      customer: {
        name: 'Emily Davis',
        email: 'emily.d@example.com',
      },
      amount: 199.99,
      status: 'refunded' as const,
      date: 'Yesterday, 3:20 PM',
    },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 24000 },
    { name: 'Feb', sales: 3000, revenue: 18000 },
    { name: 'Mar', sales: 5000, revenue: 30000 },
    { name: 'Apr', sales: 2780, revenue: 16680 },
    { name: 'May', sales: 1890, revenue: 11340 },
    { name: 'Jun', sales: 2390, revenue: 14340 },
    { name: 'Jul', sales: 3490, revenue: 20940 },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Get an overview of your shop's performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Sales"
            value="$24,780"
            icon={DollarSign}
            change={{ value: 12.5, positive: true }}
            iconColor="text-primary"
          />
          <StatCard
            title="Total Inventory"
            value="158"
            icon={Package}
            change={{ value: 2.3, positive: true }}
            iconColor="text-primary"
          />
          <StatCard
            title="Total Customers"
            value="1,245"
            icon={Users}
            change={{ value: 4.7, positive: true }}
            iconColor="text-primary"
          />
          <StatCard
            title="Average Order"
            value="$86.40"
            icon={ShoppingCart}
            change={{ value: 1.2, positive: false }}
            iconColor="text-primary"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-5">
            <DashboardCard title="Revenue Overview">
              <SalesChart data={salesData} />
            </DashboardCard>
          </div>
          <div className="md:col-span-2">
            <DashboardCard title="Performance" description="Last 30 days">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="text-sm font-medium">5.6%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[56%] rounded-full bg-primary" />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Customer Retention</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[42%] rounded-full bg-primary" />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cart Abandonment</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[18%] rounded-full bg-destructive" />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sales Growth</span>
                    <span className="text-sm font-medium">12.5%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[12.5%] rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DashboardCard title="Inventory Alerts" description="Low and out of stock items">
            <InventoryAlert items={inventoryAlerts} />
          </DashboardCard>
          <DashboardCard title="Recent Sales" description="Latest transactions">
            <RecentSales sales={recentSales} />
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
