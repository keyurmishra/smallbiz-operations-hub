
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

const StatCardGrid = () => {
  return (
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
  );
};

export default StatCardGrid;
