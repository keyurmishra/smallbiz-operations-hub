import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format, parseISO } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getEmployeeById, updateEmployeeAttendance, addPaymentRecord } from '@/data/employeeData';
import { Employee, AttendanceRecord, PaymentRecord } from '@/types/employee';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Calendar as CalendarIcon, 
  Clock, 
  UserCheck, 
  UserX, 
  DollarSign, 
  Wallet, 
  CreditCard,
  Receipt 
} from 'lucide-react';

const attendanceSchema = z.object({
  status: z.enum(['Present', 'Absent', 'Late', 'Half-day']),
  note: z.string().optional(),
});

const paymentSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  paymentMode: z.enum(['Bank Transfer', 'Cash', 'Check', 'Digital Wallet']),
  description: z.string().min(3, { message: "Description is required" }),
  date: z.date(),
});

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  
  const attendanceForm = useForm<z.infer<typeof attendanceSchema>>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      status: 'Present',
      note: '',
    },
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
      paymentMode: 'Bank Transfer',
      description: '',
      date: new Date(),
    },
  });

  useEffect(() => {
    if (id) {
      const employeeData = getEmployeeById(id);
      if (employeeData) {
        setEmployee(employeeData);
        
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayAttendance = employeeData.attendance.find(a => a.date === today);
        if (todayAttendance) {
          attendanceForm.setValue('status', todayAttendance.status);
          if (todayAttendance.note) {
            attendanceForm.setValue('note', todayAttendance.note);
          }
        } else {
          if (employeeData.status === 'Inactive') {
            attendanceForm.setValue('status', 'Absent');
            attendanceForm.setValue('note', 'Employee is inactive');
          } else if (employeeData.status === 'On Leave') {
            attendanceForm.setValue('status', 'Absent');
            attendanceForm.setValue('note', 'Employee is on leave');
          } else {
            attendanceForm.setValue('status', 'Present');
          }
        }
      }
    }
  }, [id]);

  if (!employee) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <h1 className="text-2xl font-bold mb-4">Employee not found</h1>
          <Button onClick={() => navigate('/employees')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Button>
        </div>
      </Layout>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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

  const getAttendanceBadge = (status: string) => {
    switch (status) {
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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-emerald-100 text-emerald-700">Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case 'Failed':
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const onAttendanceSubmit = (data: z.infer<typeof attendanceSchema>) => {
    if (id) {
      if (employee.status === 'Inactive' && data.status === 'Present') {
        data.status = 'Absent';
        data.note = 'Employee is inactive and cannot be marked present';
      }
      
      if (employee.status === 'On Leave' && data.status === 'Present') {
        data.status = 'Absent';
        data.note = data.note || 'Employee is on leave';
      }
      
      const updatedEmployee = updateEmployeeAttendance(id, data.status, data.note);
      if (updatedEmployee) {
        setEmployee(updatedEmployee);
        setAttendanceDialogOpen(false);
      }
    }
  };

  const onPaymentSubmit = (data: z.infer<typeof paymentSchema>) => {
    if (id) {
      const payment: Omit<PaymentRecord, 'id'> = {
        date: format(data.date, 'yyyy-MM-dd'),
        amount: data.amount,
        paymentMode: data.paymentMode,
        status: 'Completed',
        description: data.description,
        period: {
          from: format(new Date(new Date().setDate(1)), 'yyyy-MM-dd'),
          to: format(new Date(), 'yyyy-MM-dd'),
        },
      };
      
      const updatedEmployee = addPaymentRecord(id, payment);
      if (updatedEmployee) {
        setEmployee(updatedEmployee);
        setPaymentDialogOpen(false);
        paymentForm.reset();
      }
    }
  };

  const getTodayAttendance = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const attendance = employee.attendance.find(a => a.date === today);
    
    if (!attendance) {
      if (employee.status === 'Inactive' || employee.status === 'On Leave') {
        return {
          date: today,
          status: 'Absent',
          note: employee.status === 'Inactive' ? 'Employee is inactive' : 'Employee is on leave'
        } as AttendanceRecord;
      }
    }
    
    return attendance;
  };

  const todayAttendance = getTodayAttendance();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/employees')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Employee Profile</h1>
        </div>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{employee.name}</h2>
                  <p className="text-muted-foreground">{employee.role}</p>
                  <div className="mt-2">{getStatusBadge(employee.status)}</div>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                    <p>{employee.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Join Date</h3>
                    <p>{formatDate(employee.joinDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p>{employee.email}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p>{employee.phone}</p>
                    </div>
                  </div>
                  {employee.address && (
                    <div className="col-span-1 md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p>{employee.address}</p>
                      </div>
                    </div>
                  )}
                  {employee.emergencyContact && (
                    <div className="col-span-1 md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Emergency Contact</h3>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <p>{employee.emergencyContact}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/10 flex justify-between flex-wrap gap-2 mt-4">
            <div className="flex items-center">
              <div className="mr-4">
                <p className="text-sm font-medium text-muted-foreground">Today's Status</p>
                <div className="mt-1">
                  {todayAttendance 
                    ? getAttendanceBadge(todayAttendance.status)
                    : <Badge variant="outline">Not Recorded</Badge>
                  }
                  {todayAttendance && todayAttendance.note && (
                    <p className="text-xs text-muted-foreground mt-1">{todayAttendance.note}</p>
                  )}
                </div>
              </div>
              {todayAttendance && todayAttendance.status !== 'Absent' && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Check-in</p>
                  <p className="mt-1">{todayAttendance.checkInTime || "N/A"}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setAttendanceDialogOpen(true)}
                disabled={employee.status === 'Inactive'}
                title={employee.status === 'Inactive' ? 'Cannot mark attendance for inactive employee' : ''}
              >
                {todayAttendance ? 'Update Attendance' : 'Mark Attendance'}
              </Button>
              <Button variant="outline" onClick={() => setPaymentDialogOpen(true)}>
                <DollarSign className="mr-2 h-4 w-4" />
                Add Payment
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Tabs defaultValue="attendance">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="attendance">Attendance History</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attendance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>
                  View employee's attendance history and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employee.attendance.slice(0, 20).map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>{formatDate(record.date)}</TableCell>
                          <TableCell>{getAttendanceBadge(record.status)}</TableCell>
                          <TableCell>{record.checkInTime || "N/A"}</TableCell>
                          <TableCell>{record.checkOutTime || "N/A"}</TableCell>
                          <TableCell>{record.note || "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  View employee's payment records and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employee.payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{payment.amount.toFixed(2)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {payment.paymentMode === 'Bank Transfer' && <CreditCard className="h-3.5 w-3.5" />}
                              {payment.paymentMode === 'Cash' && <DollarSign className="h-3.5 w-3.5" />}
                              {payment.paymentMode === 'Check' && <Receipt className="h-3.5 w-3.5" />}
                              {payment.paymentMode === 'Digital Wallet' && <Wallet className="h-3.5 w-3.5" />}
                              <span>{payment.paymentMode}</span>
                            </div>
                          </TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>
              Record today's attendance for {employee.name}
              {employee.status === 'On Leave' && (
                <p className="text-amber-600 mt-1 text-sm">Note: This employee is currently on leave.</p>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...attendanceForm}>
            <form onSubmit={attendanceForm.handleSubmit(onAttendanceSubmit)} className="space-y-6">
              <FormField
                control={attendanceForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attendance Status</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer ${
                          field.value === 'Present' ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => field.onChange('Present')}
                      >
                        <UserCheck className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Present</p>
                          <p className="text-xs text-muted-foreground">On duty today</p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer ${
                          field.value === 'Absent' ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => field.onChange('Absent')}
                      >
                        <UserX className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">Absent</p>
                          <p className="text-xs text-muted-foreground">Not on duty</p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer ${
                          field.value === 'Late' ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => field.onChange('Late')}
                      >
                        <Clock className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Late</p>
                          <p className="text-xs text-muted-foreground">Arrived late</p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer ${
                          field.value === 'Half-day' ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => field.onChange('Half-day')}
                      >
                        <Clock className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Half-day</p>
                          <p className="text-xs text-muted-foreground">Partial day</p>
                        </div>
                      </div>
                    </div>
                    <FormControl>
                      <input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={attendanceForm.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add any notes about today's attendance" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setAttendanceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment</DialogTitle>
            <DialogDescription>
              Record a new payment for {employee.name}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...paymentForm}>
            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
              <FormField
                control={paymentForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="0.00" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    {paymentForm.formState.errors.amount && (
                      <p className="text-sm text-red-500">
                        {paymentForm.formState.errors.amount.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              
              <FormField
                control={paymentForm.control}
                name="paymentMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Mode</FormLabel>
                    <FormControl>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Check">Check</SelectItem>
                          <SelectItem value="Digital Wallet">Digital Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={paymentForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md p-3">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          className="border-none shadow-none"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={paymentForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Monthly salary, Bonus, etc." {...field} />
                    </FormControl>
                    {paymentForm.formState.errors.description && (
                      <p className="text-sm text-red-500">
                        {paymentForm.formState.errors.description.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Payment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EmployeeDetails;
