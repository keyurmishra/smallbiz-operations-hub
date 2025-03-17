
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Computers', value: 25 },
  { name: 'Audio', value: 15 },
  { name: 'Wearables', value: 15 },
  { name: 'Tablets', value: 10 },
];

const stockData = [
  { name: 'iPhone 14 Pro', stock: 2, threshold: 5 },
  { name: 'Samsung Galaxy S22', stock: 5, threshold: 5 },
  { name: 'Sony WH-1000XM4', stock: 0, threshold: 3 },
  { name: 'MacBook Pro 16"', stock: 8, threshold: 5 },
  { name: 'iPad Air', stock: 12, threshold: 8 },
  { name: 'Apple Watch Series 8', stock: 3, threshold: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB'];

const InventoryAnalytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed view of your inventory levels and stock status
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <h3 className="text-2xl font-bold mt-1">148</h3>
                  <p className="text-sm text-emerald-600 mt-1">+8 new this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                  <p className="text-sm text-amber-600 mt-1">4 require immediate attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
                  <h3 className="text-2xl font-bold mt-1">$124,500</h3>
                  <p className="text-sm text-emerald-600 mt-1">+5.2% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-subtle">
            <CardHeader>
              <CardTitle>Product Categories Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
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
          
          <Card className="shadow-subtle">
            <CardHeader>
              <CardTitle>Stock Levels vs Threshold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stockData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="stock" fill="#8884d8" name="Current Stock" />
                    <Bar dataKey="threshold" fill="#82ca9d" name="Reorder Threshold" />
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

export default InventoryAnalytics;
