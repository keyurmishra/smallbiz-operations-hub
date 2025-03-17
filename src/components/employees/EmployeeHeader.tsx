
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const EmployeeHeader: React.FC = () => {
  return (
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
  );
};

export default EmployeeHeader;
