
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { sampleEmployees } from '@/data/employeeData';
import { Employee } from '@/types/employee';
import { format } from 'date-fns';

const Employees = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(sampleEmployees);

  // Handle view employee details
  const handleViewEmployee = (id: string) => {
    navigate(`/employees/${id}`);
  };

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

  // Get today's attendance status for an employee
  const getTodayAttendance = (employee: Employee) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const record = employee.attendance.find(a => a.date === today);
    
    if (!record) return <Badge variant="outline" className="text-slate-700">Not Recorded</Badge>;
    
    switch (record.status) {
      case 'Present':
        return <Badge className="bg-emerald-100 text-emerald-700">Present</Badge>;
      case 'Absent':
        return <Badge className="bg-red-100 text-red-700">Absent</Badge>;
      case 'Late':
        return <Badge className="bg-amber-100 text-amber-700">Late</Badge>;
      case 'Half-day':
        return <Badge className="bg-blue-100 text-blue-700">Half-day</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Add department counts
  const departmentCounts = sampleEmployees.reduce((counts, employee) => {
    counts[employee.department] = (counts[employee.department] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  const activeEmployees = sampleEmployees.filter(emp => emp.status === 'Active').length;

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
                  <h3 className="text-2xl font-bold mt-1">{sampleEmployees.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                  <h3 className="text-2xl font-bold mt-1">{activeEmployees}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-subtle">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <h3 className="text-2xl font-bold mt-1">{Object.keys(departmentCounts).length}</h3>
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
                    <TableHead>Today's Status</TableHead>
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
                        <TableCell>{getTodayAttendance(employee)}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewEmployee(employee.id)}>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>Manage Access</DropdownMenuItem>
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

export default Employees;
