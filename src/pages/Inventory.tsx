
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
import { Plus, Filter, Search, MoreHorizontal, EditIcon, Trash2Icon, PackageOpen, Tag, ListChecks } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const sampleInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    category: 'Electronics',
    price: 999.99,
    stock: 2,
    status: 'Low Stock',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S22',
    category: 'Electronics',
    price: 799.99,
    stock: 5,
    status: 'Low Stock',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    category: 'Audio',
    price: 349.99,
    stock: 0,
    status: 'Out of Stock',
  },
  {
    id: '4',
    name: 'MacBook Pro 16"',
    category: 'Computers',
    price: 2399.99,
    stock: 8,
    status: 'In Stock',
  },
  {
    id: '5',
    name: 'iPad Air',
    category: 'Tablets',
    price: 599.99,
    stock: 12,
    status: 'In Stock',
  },
  {
    id: '6',
    name: 'Apple Watch Series 8',
    category: 'Wearables',
    price: 399.99,
    stock: 3,
    status: 'Low Stock',
  },
  {
    id: '7',
    name: 'AirPods Pro',
    category: 'Audio',
    price: 249.99,
    stock: 7,
    status: 'In Stock',
  },
  {
    id: '8',
    name: 'Dell XPS 13',
    category: 'Computers',
    price: 1199.99,
    stock: 6,
    status: 'In Stock',
  },
];

const Inventory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(sampleInventory);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredInventory(sampleInventory);
    } else {
      const filtered = sampleInventory.filter(
        item => 
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredInventory(filtered);
    }
  };

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
    <Layout>
      <div className="space-y-6">
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
        
        <Card className="overflow-hidden shadow-subtle">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 border-b">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
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
                    <DropdownMenuItem>All Products</DropdownMenuItem>
                    <DropdownMenuItem>In Stock</DropdownMenuItem>
                    <DropdownMenuItem>Low Stock</DropdownMenuItem>
                    <DropdownMenuItem>Out of Stock</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
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
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => (
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Inventory;
