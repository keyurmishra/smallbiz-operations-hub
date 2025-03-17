
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Employee } from '@/types/employee';

interface EmployeeStatsProps {
  employees: Employee[];
}

const EmployeeStats: React.FC<EmployeeStatsProps> = ({ employees }) => {
  // Add department counts
  const departmentCounts = employees.reduce((counts, employee) => {
    counts[employee.department] = (counts[employee.department] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="shadow-subtle">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
              <h3 className="text-2xl font-bold mt-1">{employees.length}</h3>
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
  );
};

export default EmployeeStats;
