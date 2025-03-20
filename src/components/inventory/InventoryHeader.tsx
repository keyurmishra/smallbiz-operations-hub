
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, ListChecks, Tag } from 'lucide-react';

const InventoryHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground mt-1">
          Manage your product stock and catalog
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate('/inventory/adjustments')}
        >
          <ListChecks size={16} />
          <span>Adjustments</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate('/inventory/categories')}
        >
          <Tag size={16} />
          <span>Categories</span>
        </Button>
        <Button className="flex items-center gap-2 bg-primary text-primary-foreground shadow-md hover:bg-primary/90">
          <Plus size={16} />
          <span>Add Product</span>
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;
