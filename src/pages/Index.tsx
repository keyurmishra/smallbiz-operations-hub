
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCardGrid from '@/components/dashboard/StatCardGrid';
import ChartSection from '@/components/dashboard/ChartSection';
import AlertsSection from '@/components/dashboard/AlertsSection';
import { sampleInventoryAlerts, sampleRecentSales, sampleSalesData } from '@/types/dashboard';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <DashboardHeader />
        <StatCardGrid />
        <ChartSection salesData={sampleSalesData} />
        <AlertsSection 
          inventoryAlerts={sampleInventoryAlerts} 
          recentSales={sampleRecentSales} 
        />
      </div>
    </Layout>
  );
};

export default Index;
