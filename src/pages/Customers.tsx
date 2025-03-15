
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Filter, Search, MoreHorizontal, UserIcon, Mail, Phone, ShoppingBag } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastPurchase: string;
  status: 'Active' | 'Inactive';
}

const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    totalOrders: 8,
    totalSpent: 1299.99,
    lastPurchase: '2023-07-15',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    totalOrders: 5,
    totalSpent: 899.50,
    lastPurchase: '2023-07-10',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 765-4321',
    totalOrders: 2,
    totalSpent: 349.99,
    lastPurchase: '2023-07-05',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '(555) 234-5678',
    totalOrders: 3,
    totalSpent: 499.99,
    lastPurchase: '2023-06-30',
    status: 'Inactive',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    phone: '(555) 876-5432',
    totalOrders: 6,
    totalSpent: 1499.99,
    lastPurchase: '2023-07-12',
    status: 'Active',
  },
  {
    id: '6',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@example.com',
    phone: '(555) 345-6789',
    totalOrders: 1,
    totalSpent: 129.99,
    lastPurchase: '2023-06-15',
    status: 'Inactive',
  },
  {
    id: '7',
    name: 'David Miller',
    email: 'david.miller@example.com',
    phone: '(555) 654-3210',
    totalOrders: 4,
    totalSpent: 799.99,
    lastPurchase: '2023-07-08',
    status: 'Active',
  },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(sampleCustomers);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredCustomers(sampleCustomers);
    } else {
      const filtered = sampleCustomers.filter(
        customer => 
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.email.toLowerCase().includes(query.toLowerCase()) ||
          customer.phone.includes(query)
      );
      setFilteredCustomers(filtered);
    }
  };

  // Status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">Active</Badge>;
      case 'Inactive':
        return <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your customer relationships
            </p>
          </div>
          <Button className="flex items-center gap-2 shadow-md">
            <Plus size={16} />
            <span>Add Customer</span>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <h3 className="text-2xl font-bold mt-1">7</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                  <h3 className="text-2xl font-bold mt-1">5</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">29</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Spent</p>
                  <h3 className="text-2xl font-bold mt-1">$795.35</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="overflow-hidden shadow-subtle">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 border-b">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10 max-w-sm"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>All Customers</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead>Last Purchase</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="animate-fade-in">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary">{getInitials(customer.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                              <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{customer.totalOrders}</TableCell>
                        <TableCell className="text-right">{formatCurrency(customer.totalSpent)}</TableCell>
                        <TableCell>{formatDate(customer.lastPurchase)}</TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Edit Customer</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Sales History</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Customers;
