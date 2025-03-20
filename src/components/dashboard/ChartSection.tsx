
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import SalesChart from '@/components/dashboard/SalesChart';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';

interface ChartSectionProps {
  salesData: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
}

const ChartSection: React.FC<ChartSectionProps> = ({ salesData }) => {
  return (
    <div className="grid gap-4 md:grid-cols-7">
      <div className="md:col-span-5">
        <DashboardCard title="Revenue Overview">
          <SalesChart data={salesData} />
        </DashboardCard>
      </div>
      <div className="md:col-span-2">
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default ChartSection;
