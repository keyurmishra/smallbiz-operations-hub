
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SpinningLogo from '@/components/3d/SpinningLogo';
import { 
  FileText, 
  Plus, 
  Clock, 
  DollarSign, 
  UserPlus, 
  Package, 
  Settings, 
  BarChart2,
  CreditCard,
  Calendar,
  User,
  Tag
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const quickActions = [
    { icon: <Plus className="h-5 w-5 text-white" />, label: "New Invoice", color: "bg-blue-600", path: "/pos" },
    { icon: <UserPlus className="h-5 w-5 text-white" />, label: "New Customer", color: "bg-green-600", path: "/customer-management" },
    { icon: <Package className="h-5 w-5 text-white" />, label: "New Product", color: "bg-purple-600", path: "/products" },
    { icon: <CreditCard className="h-5 w-5 text-white" />, label: "Record Payment", color: "bg-orange-600", path: "/billing" }
  ];
  
  const modules = [
    { icon: <FileText className="h-6 w-6" />, label: "Invoices", description: "Create and manage invoices", path: "/pos" },
    { icon: <User className="h-6 w-6" />, label: "Customers", description: "Manage your customer data", path: "/customer-management" },
    { icon: <Tag className="h-6 w-6" />, label: "Products", description: "Manage your product catalog", path: "/products" },
    { icon: <Calendar className="h-6 w-6" />, label: "Expenses", description: "Track business expenses", path: "/billing" },
    { icon: <BarChart2 className="h-6 w-6" />, label: "Reports", description: "Financial analytics", path: "/analytics" },
    { icon: <Settings className="h-6 w-6" />, label: "Settings", description: "Configure your account", path: "/settings" }
  ];

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome to Zoho Invoice</h1>
          <p className="text-muted-foreground">Manage your invoices and payments efficiently</p>
        </div>
        
        {/* 3D Logo */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <SpinningLogo />
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, idx) => (
              <Button 
                key={idx} 
                variant="ghost"
                className="h-auto py-4 flex flex-col items-center border rounded-lg hover:bg-gray-50"
                onClick={() => navigate(action.path)}
              >
                <div className={`${action.color} rounded-full p-2 mb-2`}>
                  {action.icon}
                </div>
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </section>
        
        {/* Dashboard Overview */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-white border rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-blue-50 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Unpaid Invoices</h3>
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold mt-2">$12,580.00</p>
                  <p className="text-sm text-muted-foreground">12 invoices pending</p>
                </div>
                <div className="p-4">
                  <Button variant="outline" className="w-full" size="sm">
                    View All Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-green-50 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Payments Received</h3>
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold mt-2">$8,245.00</p>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
                <div className="p-4">
                  <Button variant="outline" className="w-full" size="sm">
                    View Payment History
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-amber-50 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Overdue Invoices</h3>
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <p className="text-2xl font-bold mt-2">$3,850.00</p>
                  <p className="text-sm text-muted-foreground">5 invoices overdue</p>
                </div>
                <div className="p-4">
                  <Button variant="outline" className="w-full" size="sm">
                    Send Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Modules */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Modules</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {modules.map((module, idx) => (
              <Card 
                key={idx} 
                className="hover:border-primary cursor-pointer transition-colors"
                onClick={() => navigate(module.path)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="bg-primary/10 rounded-full p-3 mb-3">
                    {module.icon}
                  </div>
                  <h3 className="font-medium">{module.label}</h3>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
