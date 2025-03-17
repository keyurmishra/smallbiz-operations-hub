
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const customerGrowthData = [
  { month: 'Jan', customers: 120 },
  { month: 'Feb', customers: 150 },
  { month: 'Mar', customers: 200 },
  { month: 'Apr', customers: 230 },
  { month: 'May', customers: 270 },
  { month: 'Jun', customers: 310 },
  { month: 'Jul', customers: 350 },
];

const customerSpendingData = [
  { name: 'John Doe', spent: 1200 },
  { name: 'Jane Smith', spent: 900 },
  { name: 'Robert Johnson', spent: 350 },
  { name: 'Emily Davis', spent: 500 },
  { name: 'Michael Wilson', spent: 1500 },
  { name: 'Sarah Thompson', spent: 130 },
  { name: 'David Miller', spent: 800 },
];

const customerAgeData = [
  { name: '18-24', value: 15 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 25 },
  { name: '45-54', value: 15 },
  { name: '55+', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB'];

const CustomerAnalytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Insights into your customer demographics and behavior
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <h3 className="text-2xl font-bold mt-1">350</h3>
                  <p className="text-sm text-emerald-600 mt-1">+40 from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Lifetime Value</p>
                  <h3 className="text-2xl font-bold mt-1">$1,254</h3>
                  <p className="text-sm text-emerald-600 mt-1">+8% from last quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Repeat Purchase Rate</p>
                  <h3 className="text-2xl font-bold mt-1">68%</h3>
                  <p className="text-sm text-emerald-600 mt-1">+5% from last quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-subtle">
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={customerGrowthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 8 }} name="Total Customers" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardHeader>
              <CardTitle>Top Customers by Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={customerSpendingData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="spent" fill="#8884d8" name="Total Spent ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle>Customer Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerAgeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerAgeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerAnalytics;
