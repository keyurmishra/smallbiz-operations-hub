
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { sampleEmployees } from '@/data/employeeData';
import { Employee } from '@/types/employee';

// Import our new components
import EmployeeHeader from '@/components/employees/EmployeeHeader';
import EmployeeStats from '@/components/employees/EmployeeStats';
import EmployeeFilters from '@/components/employees/EmployeeFilters';
import EmployeeTable from '@/components/employees/EmployeeTable';

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

  return (
    <Layout>
      <div className="space-y-6">
        <EmployeeHeader />
        
        <EmployeeStats employees={sampleEmployees} />
        
        <Card className="overflow-hidden shadow-subtle">
          <CardContent className="p-0">
            <EmployeeFilters 
              searchQuery={searchQuery}
              handleSearch={handleSearch}
            />
            
            <EmployeeTable filteredEmployees={filteredEmployees} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Employees;
