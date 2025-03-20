
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';

const PerformanceMetrics = () => {
  return (
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
  );
};

export default PerformanceMetrics;
