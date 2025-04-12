
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Search, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 13 Pro',
      category: 'Electronics',
      sku: 'IP13-PRO-256',
      price: 999.99,
      cost: 799.99,
      stock: 25,
      reorderLevel: 5,
      description: 'Apple iPhone 13 Pro 256GB',
      image: 'https://placehold.co/200x200'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S22',
      category: 'Electronics',
      sku: 'SG-S22-128',
      price: 799.99,
      cost: 599.99,
      stock: 18,
      reorderLevel: 5,
      description: 'Samsung Galaxy S22 128GB',
      image: 'https://placehold.co/200x200'
    },
    {
      id: '3',
      name: 'Dell XPS 15',
      category: 'Computers',
      sku: 'DL-XPS15-1TB',
      price: 1799.99,
      cost: 1499.99,
      stock: 12,
      reorderLevel: 3,
      description: 'Dell XPS 15 Laptop with 1TB SSD',
      image: 'https://placehold.co/200x200'
    },
    {
      id: '4',
      name: 'AirPods Pro',
      category: 'Accessories',
      sku: 'AP-PRO-2',
      price: 249.99,
      cost: 179.99,
      stock: 42,
      reorderLevel: 10,
      description: 'Apple AirPods Pro 2nd Generation',
      image: 'https://placehold.co/200x200'
    },
    {
      id: '5',
      name: 'Logitech MX Master 3',
      category: 'Accessories',
      sku: 'LG-MXM3',
      price: 99.99,
      cost: 69.99,
      stock: 30,
      reorderLevel: 8,
      description: 'Logitech MX Master 3 Wireless Mouse',
      image: 'https://placehold.co/200x200'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    category: '',
    sku: '',
    price: 0,
    cost: 0,
    stock: 0,
    reorderLevel: 0,
    description: ''
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    // Convert numeric fields
    if (name === 'price' || name === 'cost' || name === 'stock' || name === 'reorderLevel') {
      parsedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setNewProduct({ ...newProduct, [name]: parsedValue });
  };

  const handleAddProduct = () => {
    // Ensure newProduct has a valid ID and all required fields
    const productToAdd: Product = {
      ...newProduct,
      id: uuidv4()
    };
    
    setProducts(prev => [...prev, productToAdd]);
    setIsAddProductOpen(false);
    
    // Reset form
    setNewProduct({
      id: '',
      name: '',
      category: '',
      sku: '',
      price: 0,
      cost: 0,
      stock: 0,
      reorderLevel: 0,
      description: ''
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number, reorderLevel: number) => {
    if (stock <= 0) return { label: 'Out of Stock', color: 'destructive' };
    if (stock <= reorderLevel) return { label: 'Low Stock', color: 'warning' };
    return { label: 'In Stock', color: 'success' };
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">Manage your inventory and product listings</p>
          </div>
          <Button onClick={() => setIsAddProductOpen(true)} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => {
                      const status = getStockStatus(product.stock, product.reorderLevel);
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${product.cost.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{product.stock}</TableCell>
                          <TableCell>
                            <Badge variant={status.color as "default" | "secondary" | "destructive" | "outline"}>{status.label}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">No products found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Input id="category" name="category" value={newProduct.category} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="sku" className="text-sm font-medium">SKU</label>
                <Input id="sku" name="sku" value={newProduct.sku} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price</label>
                <Input id="price" name="price" type="number" value={newProduct.price} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="cost" className="text-sm font-medium">Cost</label>
                <Input id="cost" name="cost" type="number" value={newProduct.cost} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="stock" className="text-sm font-medium">Stock</label>
                <Input id="stock" name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="reorderLevel" className="text-sm font-medium">Reorder Level</label>
                <Input id="reorderLevel" name="reorderLevel" type="number" value={newProduct.reorderLevel} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input id="description" name="description" value={newProduct.description} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Products;
