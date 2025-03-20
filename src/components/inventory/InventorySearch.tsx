
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, Search } from 'lucide-react';

interface InventorySearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InventorySearch: React.FC<InventorySearchProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 border-b">
      <div className="relative max-w-sm w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-10 max-w-sm"
          value={searchQuery}
          onChange={onSearchChange}
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
            <DropdownMenuItem>All Products</DropdownMenuItem>
            <DropdownMenuItem>In Stock</DropdownMenuItem>
            <DropdownMenuItem>Low Stock</DropdownMenuItem>
            <DropdownMenuItem>Out of Stock</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default InventorySearch;
