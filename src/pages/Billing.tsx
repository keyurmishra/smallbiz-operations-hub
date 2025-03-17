
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
import { FileText, Filter, Search, MoreHorizontal, Download, Printer, Send, ExternalLink } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
}

const sampleInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    customer: 'John Doe',
    date: '2023-07-01',
    dueDate: '2023-07-15',
    amount: 599.99,
    status: 'Paid',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    customer: 'Jane Smith',
    date: '2023-07-03',
    dueDate: '2023-07-17',
    amount: 349.99,
    status: 'Paid',
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    customer: 'Robert Johnson',
    date: '2023-07-05',
    dueDate: '2023-07-19',
    amount: 199.99,
    status: 'Pending',
  },
  {
    id: '4',
    invoiceNumber: 'INV-004',
    customer: 'Emily Davis',
    date: '2023-07-08',
    dueDate: '2023-07-22',
    amount: 129.99,
    status: 'Pending',
  },
  {
    id: '5',
    invoiceNumber: 'INV-005',
    customer: 'Michael Wilson',
    date: '2023-06-25',
    dueDate: '2023-07-09',
    amount: 799.99,
    status: 'Overdue',
  },
  {
    id: '6',
    invoiceNumber: 'INV-006',
    customer: 'Sarah Thompson',
    date: '2023-07-10',
    dueDate: '2023-07-24',
    amount: 249.99,
    status: 'Draft',
  },
];

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(sampleInvoices);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredInvoices(sampleInvoices);
    } else {
      const filtered = sampleInvoices.filter(
        invoice => 
          invoice.invoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
          invoice.customer.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredInvoices(filtered);
    }
  };

  // Status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">Paid</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="text-amber-700 border-amber-200 hover:bg-transparent dark:border-amber-700">Pending</Badge>;
      case 'Overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'Draft':
        return <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400">Draft</Badge>;
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
            <h1 className="text-3xl font-bold tracking-tight">Billing & Invoices</h1>
            <p className="text-muted-foreground mt-1">
              Manage your invoices and payment records
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              <span>Export</span>
            </Button>
            <Button className="flex items-center gap-2 shadow-md">
              <FileText size={16} />
              <span>New Invoice</span>
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">$2,329.94</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold mt-1">$329.98</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <h3 className="text-2xl font-bold mt-1">$799.99</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Invoices</p>
                  <h3 className="text-2xl font-bold mt-1">6</h3>
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
                  placeholder="Search invoices..."
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
                    <DropdownMenuItem>All Invoices</DropdownMenuItem>
                    <DropdownMenuItem>Paid</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Overdue</DropdownMenuItem>
                    <DropdownMenuItem>Draft</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id} className="animate-fade-in">
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.customer}</TableCell>
                        <TableCell>{formatDate(invoice.date)}</TableCell>
                        <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <ExternalLink className="h-4 w-4" />
                                <span>View Invoice</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Send className="h-4 w-4" />
                                <span>Send Invoice</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Download className="h-4 w-4" />
                                <span>Download PDF</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Printer className="h-4 w-4" />
                                <span>Print</span>
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

export default Billing;
