
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
import { Filter, Search, MoreHorizontal, FileText, Download } from 'lucide-react';

interface Sale {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  amount: number;
  items: number;
  status: 'Completed' | 'Pending' | 'Refunded' | 'Cancelled';
}

const sampleSales: Sale[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customer: 'John Doe',
    date: '2023-07-15',
    amount: 399.99,
    items: 2,
    status: 'Completed',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customer: 'Jane Smith',
    date: '2023-07-14',
    amount: 149.99,
    items: 1,
    status: 'Completed',
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customer: 'Robert Johnson',
    date: '2023-07-14',
    amount: 79.99,
    items: 1,
    status: 'Pending',
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    customer: 'Emily Davis',
    date: '2023-07-13',
    amount: 199.99,
    items: 3,
    status: 'Refunded',
  },
  {
    id: '5',
    orderNumber: 'ORD-005',
    customer: 'Michael Wilson',
    date: '2023-07-13',
    amount: 599.99,
    items: 2,
    status: 'Completed',
  },
  {
    id: '6',
    orderNumber: 'ORD-006',
    customer: 'Sarah Thompson',
    date: '2023-07-12',
    amount: 129.99,
    items: 1,
    status: 'Cancelled',
  },
  {
    id: '7',
    orderNumber: 'ORD-007',
    customer: 'David Miller',
    date: '2023-07-12',
    amount: 349.99,
    items: 2,
    status: 'Completed',
  },
  {
    id: '8',
    orderNumber: 'ORD-008',
    customer: 'Jennifer Brown',
    date: '2023-07-11',
    amount: 499.99,
    items: 3,
    status: 'Completed',
  },
];

const Sales = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSales, setFilteredSales] = useState<Sale[]>(sampleSales);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredSales(sampleSales);
    } else {
      const filtered = sampleSales.filter(
        sale => 
          sale.orderNumber.toLowerCase().includes(query.toLowerCase()) ||
          sale.customer.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSales(filtered);
    }
  };

  // Status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">Completed</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="text-amber-700 border-amber-200 hover:bg-transparent dark:border-amber-700">Pending</Badge>;
      case 'Refunded':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400">Refunded</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all sales transactions
            </p>
          </div>
          <Button className="flex items-center gap-2 shadow-md">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                  <h3 className="text-2xl font-bold mt-1">$2,409.92</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">8</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Order</p>
                  <h3 className="text-2xl font-bold mt-1">$301.24</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <h3 className="text-2xl font-bold mt-1">75%</h3>
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
                  placeholder="Search orders..."
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
                    <DropdownMenuItem>All Orders</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Refunded</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.length > 0 ? (
                    filteredSales.map((sale) => (
                      <TableRow key={sale.id} className="animate-fade-in">
                        <TableCell className="font-medium">{sale.orderNumber}</TableCell>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{formatDate(sale.date)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sale.amount)}</TableCell>
                        <TableCell className="text-right">{sale.items}</TableCell>
                        <TableCell>{getStatusBadge(sale.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <FileText className="h-4 w-4" />
                                <span>View Invoice</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
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

export default Sales;
