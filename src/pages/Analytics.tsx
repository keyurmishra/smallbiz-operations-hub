
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            View detailed analytics about your business
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Sales Analytics</h3>
                  <p className="text-muted-foreground mt-1">
                    Track your sales performance over time
                  </p>
                </div>
                <NavLink to="/analytics/sales" className="w-full">
                  <Button className="w-full">View Sales Analytics</Button>
                </NavLink>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Inventory Analytics</h3>
                  <p className="text-muted-foreground mt-1">
                    Monitor your inventory flow and stock levels
                  </p>
                </div>
                <NavLink to="/analytics/inventory" className="w-full">
                  <Button className="w-full">View Inventory Analytics</Button>
                </NavLink>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Customer Analytics</h3>
                  <p className="text-muted-foreground mt-1">
                    Understand your customer behavior and demographics
                  </p>
                </div>
                <NavLink to="/analytics/customers" className="w-full">
                  <Button className="w-full">View Customer Analytics</Button>
                </NavLink>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
