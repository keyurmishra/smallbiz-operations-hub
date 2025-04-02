
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Trash2, 
  ShoppingBag, 
  Heart 
} from 'lucide-react';

// Sample customer data
const sampleCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, USA',
    joinDate: '2022-03-15',
    totalSpent: 1245.67,
    lastPurchase: '2023-04-12',
    purchaseCount: 12,
    customerType: 'regular',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-987-6543',
    address: '456 Oak Ave, Somewhere, USA',
    joinDate: '2021-11-22',
    totalSpent: 3567.89,
    lastPurchase: '2023-05-01',
    purchaseCount: 24,
    customerType: 'vip',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '555-456-7890',
    address: '789 Pine Blvd, Nowhere, USA',
    joinDate: '2023-01-05',
    totalSpent: 487.25,
    lastPurchase: '2023-04-25',
    purchaseCount: 5,
    customerType: 'new',
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'bob@example.com',
    phone: '555-789-0123',
    address: '101 Cedar Ln, Elsewhere, USA',
    joinDate: '2022-08-17',
    totalSpent: 912.50,
    lastPurchase: '2023-03-30',
    purchaseCount: 8,
    customerType: 'regular',
  },
  {
    id: '5',
    name: 'Carol Brown',
    email: 'carol@example.com',
    phone: '555-321-6547',
    address: '202 Birch St, Anywhere, USA',
    joinDate: '2021-05-10',
    totalSpent: 4125.75,
    lastPurchase: '2023-05-05',
    purchaseCount: 32,
    customerType: 'vip',
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().optional(),
  customerType: z.string().optional(),
});

const CustomerManagement = () => {
  const [customers, setCustomers] = useState(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<typeof sampleCustomers[0] | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      customerType: "regular",
    },
  });
  
  const openAddDialog = () => {
    setEditingCustomer(null);
    form.reset({
      name: "",
      email: "",
      phone: "",
      address: "",
      customerType: "regular",
    });
    setIsAddDialogOpen(true);
  };
  
  const openEditDialog = (customer: typeof sampleCustomers[0]) => {
    setEditingCustomer(customer);
    form.reset({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      customerType: customer.customerType,
    });
    setIsAddDialogOpen(true);
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(prev => 
        prev.map(c => c.id === editingCustomer.id ? { ...c, ...values } : c)
      );
      toast({
        title: "Customer Updated",
        description: `${values.name}'s information has been updated.`,
      });
    } else {
      // Add new customer
      const newCustomer = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address || "",
        joinDate: new Date().toISOString().split('T')[0],
        totalSpent: 0,
        lastPurchase: "",
        purchaseCount: 0,
        customerType: values.customerType || "regular",
      };
      setCustomers([...customers, newCustomer]);
      toast({
        title: "Customer Added",
        description: `${values.name} has been added to your customer database.`,
      });
    }
    setIsAddDialogOpen(false);
  };
  
  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
      toast({
        title: "Customer Deleted",
        description: "The customer has been removed from your database.",
        variant: "destructive",
      });
    }
  };
  
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm);
    const matchesTab = activeTab === 'all' || customer.customerType === activeTab;
    return matchesSearch && matchesTab;
  });
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getCustomerTypeBadge = (type: string) => {
    switch (type) {
      case 'vip':
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">VIP</span>;
      case 'new':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">New</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Regular</span>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">
              Manage your customer database and relationships
            </p>
          </div>
          <Button onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.customerType === 'vip').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Customers (30d)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => {
                  const today = new Date();
                  const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
                  return new Date(c.joinDate) >= thirtyDaysAgo;
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Customers</TabsTrigger>
                <TabsTrigger value="vip">VIP</TabsTrigger>
                <TabsTrigger value="regular">Regular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Purchase</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {customer.name}
                                {getCustomerTypeBadge(customer.customerType)}
                              </div>
                              <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {customer.address}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              {customer.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              {customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {formatDate(customer.joinDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          ${customer.totalSpent.toFixed(2)}
                          <div className="text-xs text-muted-foreground">
                            {customer.purchaseCount} purchases
                          </div>
                        </TableCell>
                        <TableCell>
                          {customer.lastPurchase ? formatDate(customer.lastPurchase) : "No purchases"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(customer)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCustomer(customer.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Add/Edit Customer Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
              <DialogDescription>
                {editingCustomer 
                  ? 'Update the customer information below.' 
                  : 'Fill in the details to add a new customer to your database.'}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="555-123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Anytown, USA" {...field} />
                      </FormControl>
                      <FormDescription>
                        Customer's full address (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="customerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Type</FormLabel>
                      <div className="flex gap-4">
                        <div
                          className={`flex-1 flex flex-col items-center p-3 border rounded-md cursor-pointer ${
                            field.value === 'regular' ? 'bg-primary/10 border-primary' : ''
                          }`}
                          onClick={() => form.setValue('customerType', 'regular')}
                        >
                          <User 
                            className={`h-5 w-5 mb-1 ${field.value === 'regular' ? 'text-primary' : 'text-muted-foreground'}`} 
                          />
                          <span className="text-sm font-medium">Regular</span>
                        </div>
                        
                        <div
                          className={`flex-1 flex flex-col items-center p-3 border rounded-md cursor-pointer ${
                            field.value === 'vip' ? 'bg-primary/10 border-primary' : ''
                          }`}
                          onClick={() => form.setValue('customerType', 'vip')}
                        >
                          <Heart 
                            className={`h-5 w-5 mb-1 ${field.value === 'vip' ? 'text-primary' : 'text-muted-foreground'}`} 
                          />
                          <span className="text-sm font-medium">VIP</span>
                        </div>
                        
                        <div
                          className={`flex-1 flex flex-col items-center p-3 border rounded-md cursor-pointer ${
                            field.value === 'new' ? 'bg-primary/10 border-primary' : ''
                          }`}
                          onClick={() => form.setValue('customerType', 'new')}
                        >
                          <User 
                            className={`h-5 w-5 mb-1 ${field.value === 'new' ? 'text-primary' : 'text-muted-foreground'}`} 
                          />
                          <span className="text-sm font-medium">New</span>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCustomer ? 'Save Changes' : 'Add Customer'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CustomerManagement;
