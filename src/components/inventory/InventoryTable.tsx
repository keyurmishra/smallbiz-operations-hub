
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
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
import { MoreHorizontal, EditIcon, Trash2Icon, PackageOpen } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface InventoryTableProps {
  inventory: InventoryItem[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory }) => {
  const navigate = useNavigate();
  
  // Status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">In Stock</Badge>;
      case 'Low Stock':
        return <Badge variant="outline" className="text-amber-700 border-amber-200 hover:bg-transparent dark:border-amber-700">Low Stock</Badge>;
      case 'Out of Stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.length > 0 ? (
            inventory.map((item) => (
              <TableRow 
                key={item.id} 
                className="animate-fade-in cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/inventory/item/${item.id}`)}
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                <TableCell className="text-right">{item.stock}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/inventory/item/${item.id}`);
                        }}
                      >
                        <PackageOpen className="h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <EditIcon className="h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2Icon className="h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
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
  );
};

export default InventoryTable;
