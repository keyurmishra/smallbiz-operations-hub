
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
import { Plus, Filter, Search, MoreHorizontal, Mail, Phone, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    role: 'Store Manager',
    department: 'Management',
    joinDate: '2022-01-15',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 987-6543',
    role: 'Sales Associate',
    department: 'Sales',
    joinDate: '2022-03-10',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Jessica Taylor',
    email: 'jessica.taylor@example.com',
    phone: '(555) 765-4321',
    role: 'Inventory Specialist',
    department: 'Inventory',
    joinDate: '2022-02-20',
    status: 'Active',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '(555) 234-5678',
    role: 'Customer Service',
    department: 'Customer Support',
    joinDate: '2022-04-05',
    status: 'On Leave',
  },
  {
    id: '5',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    phone: '(555) 876-5432',
    role: 'Assistant Manager',
    department: 'Management',
    joinDate: '2022-01-30',
    status: 'Active',
  },
  {
    id: '6',
    name: 'James Brown',
    email: 'james.brown@example.com',
    phone: '(555) 345-6789',
    role: 'IT Support',
    department: 'IT',
    joinDate: '2022-05-15',
    status: 'Inactive',
  },
];

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(sampleEmployees);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredEmployees(sampleEmployees);
    } else {
      const filtered = sampleEmployees.filter(
        employee => 
          employee.name.toLowerCase().includes(query.toLowerCase()) ||
          employee.email.toLowerCase().includes(query.toLowerCase()) ||
          employee.role.toLowerCase().includes(query.toLowerCase()) ||
          employee.department.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };

  // Status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">Active</Badge>;
      case 'On Leave':
        return <Badge variant="outline" className="text-amber-700 border-amber-200 hover:bg-transparent dark:border-amber-700">On Leave</Badge>;
      case 'Inactive':
        return <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
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
            <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
            <p className="text-muted-foreground mt-1">
              Manage your store staff and their roles
            </p>
          </div>
          <Button className="flex items-center gap-2 shadow-md">
            <Plus size={16} />
            <span>Add Employee</span>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                  <h3 className="text-2xl font-bold mt-1">6</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                  <h3 className="text-2xl font-bold mt-1">4</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <h3 className="text-2xl font-bold mt-1">4</h3>
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
                  placeholder="Search employees..."
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
                    <DropdownMenuItem>All Employees</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>On Leave</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id} className="animate-fade-in">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary">{getInitials(employee.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Mail className="mr-1 h-3 w-3" />
                                  <span>{employee.email}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Phone className="mr-1 h-3 w-3" />
                                  <span>{employee.phone}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{formatDate(employee.joinDate)}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">View Profile</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Edit Details</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Manage Access</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
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

export default Employees;
