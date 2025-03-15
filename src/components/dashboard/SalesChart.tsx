
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SalesData {
  name: string;
  sales: number;
  revenue: number;
}

interface SalesChartProps {
  data: SalesData[];
  className?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ data, className }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Tabs defaultValue="area">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Sales Overview</h3>
          <TabsList>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
          </TabsList>
        </div>
  
        <TabsContent value="area" className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs text-muted-foreground" />
              <YAxis 
                className="text-xs text-muted-foreground"
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => {
                  return [formatCurrency(value), name];
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10b981"
                fill="url(#colorRevenue)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="hsl(var(--primary))"
                fill="url(#colorSales)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>
  
        <TabsContent value="bar" className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs text-muted-foreground" />
              <YAxis 
                className="text-xs text-muted-foreground"
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => {
                  return [formatCurrency(value), name];
                }}
              />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sales" name="Sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesChart;
