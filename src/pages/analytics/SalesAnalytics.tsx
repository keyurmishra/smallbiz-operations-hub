
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, target: 4200 },
  { name: 'Feb', sales: 3000, target: 3800 },
  { name: 'Mar', sales: 5000, target: 4800 },
  { name: 'Apr', sales: 2780, target: 3000 },
  { name: 'May', sales: 1890, target: 2500 },
  { name: 'Jun', sales: 2390, target: 2800 },
  { name: 'Jul', sales: 3490, target: 3300 },
];

const productData = [
  { name: 'iPhone 14 Pro', sales: 12000 },
  { name: 'Samsung Galaxy S22', sales: 9800 },
  { name: 'MacBook Pro 16"', sales: 6800 },
  { name: 'iPad Air', sales: 5400 },
  { name: 'Apple Watch Series 8', sales: 4200 },
  { name: 'AirPods Pro', sales: 3900 },
];

const SalesAnalytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed view of your sales performance over time
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">$48,550</h3>
                  <p className="text-sm text-emerald-600 mt-1">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Order Value</p>
                  <h3 className="text-2xl font-bold mt-1">$275.84</h3>
                  <p className="text-sm text-emerald-600 mt-1">+3.2% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <h3 className="text-2xl font-bold mt-1">3.8%</h3>
                  <p className="text-sm text-amber-600 mt-1">-0.5% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-subtle">
            <CardHeader>
              <CardTitle>Monthly Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} name="Sales" />
                    <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SalesAnalytics;
