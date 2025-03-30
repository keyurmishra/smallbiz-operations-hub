
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Mail, Phone, Calendar } from 'lucide-react';
import { Employee } from '@/types/employee';

interface EmployeeTableProps {
  filteredEmployees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ filteredEmployees }) => {
  const navigate = useNavigate();

  // Handle view employee details
  const handleViewEmployee = (id: string) => {
    navigate(`/employees/${id}`);
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

  // Get today's attendance status for an employee with improved accuracy
  const getTodayAttendance = (employee: Employee) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const record = employee.attendance.find(a => a.date === today);
    
    if (!record) {
      // If employee is inactive, show appropriate status
      if (employee.status === 'Inactive') {
        return <Badge variant="secondary" className="bg-slate-100 text-slate-700">Inactive</Badge>;
      }
      if (employee.status === 'On Leave') {
        return <Badge variant="outline" className="text-amber-700 border-amber-200">On Leave</Badge>;
      }
      return <Badge variant="outline" className="text-slate-700">Not Recorded</Badge>;
    }
    
    switch (record.status) {
      case 'Present':
        return <Badge className="bg-emerald-100 text-emerald-700">Present (8AM-7PM)</Badge>;
      case 'Absent':
        return <Badge className="bg-red-100 text-red-700">Absent</Badge>;
      case 'Late':
        return <Badge className="bg-amber-100 text-amber-700">Late</Badge>;
      case 'Half-day':
        return <Badge className="bg-blue-100 text-blue-700">Half-day (8AM-12PM)</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
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
  );
};

export default EmployeeTable;
