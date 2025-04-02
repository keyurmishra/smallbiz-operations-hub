
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Plus, Edit, Trash2, Package, BarChart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: 'Basic T-shirt',
    category: 'Apparel',
    sku: 'APP-TS-001',
    price: 19.99,
    cost: 8.50,
    stock: 45,
    reorderLevel: 10,
    description: 'Basic cotton t-shirt in various colors',
  },
  {
    id: '2',
    name: 'Premium Hoodie',
    category: 'Apparel',
    sku: 'APP-HD-002',
    price: 49.99,
    cost: 22.00,
    stock: 28,
    reorderLevel: 5,
    description: 'Premium quality hoodie with embroidered logo',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    sku: 'ELC-EB-001',
    price: 89.99,
    cost: 35.00,
    stock: 12,
    reorderLevel: 5,
    description: 'Bluetooth wireless earbuds with noise cancellation',
  },
  {
    id: '4',
    name: 'Stainless Water Bottle',
    category: 'Accessories',
    sku: 'ACC-WB-001',
    price: 24.99,
    cost: 9.75,
    stock: 52,
    reorderLevel: 15,
    description: 'Double-walled insulated stainless steel water bottle',
  },
  {
    id: '5',
    name: 'Leather Wallet',
    category: 'Accessories',
    sku: 'ACC-WL-002',
    price: 34.99,
    cost: 14.25,
    stock: 18,
    reorderLevel: 8,
    description: 'Genuine leather wallet with RFID protection',
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  sku: z.string().min(3, { message: "SKU must be at least 3 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  cost: z.coerce.number().positive({ message: "Cost must be a positive number." }),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer." }),
  reorderLevel: z.coerce.number().int().nonnegative({ message: "Reorder level must be a non-negative integer." }),
  description: z.string().optional(),
});

const Products = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<null | typeof sampleProducts[0]>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      sku: "",
      price: 0,
      cost: 0,
      stock: 0,
      reorderLevel: 0,
      description: "",
    },
  });

  const openEditDialog = (product: typeof sampleProducts[0]) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      category: product.category,
      sku: product.sku,
      price: product.price,
      cost: product.cost,
      stock: product.stock,
      reorderLevel: product.reorderLevel,
      description: product.description,
    });
    setOpenDialog(true);
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    form.reset({
      name: "",
      category: "",
      sku: "",
      price: 0,
      cost: 0,
      stock: 0,
      reorderLevel: 0,
      description: "",
    });
    setOpenDialog(true);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => 
        prev.map(p => p.id === editingProduct.id ? { ...p, ...values } : p)
      );
      toast({
        title: "Product Updated",
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // Add new product
      const newProduct = {
        id: Date.now().toString(),
        ...values,
      };
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Product Added",
        description: `${values.name} has been added to inventory.`,
      });
    }
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Product Deleted",
        description: "The product has been removed from inventory.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your inventory products and stock levels
            </p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.stock <= p.reorderLevel).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${products.reduce((acc, p) => acc + (p.cost * p.stock), 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Potential Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>
              Manage your products and inventory levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className={product.stock <= product.reorderLevel ? "bg-amber-50 dark:bg-amber-950/20" : ""}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={product.stock <= product.reorderLevel ? "text-amber-600 font-medium" : ""}>
                            {product.stock}
                          </span>
                          {product.stock <= product.reorderLevel && (
                            <span className="inline-flex h-5 items-center rounded-full border border-amber-200 bg-amber-100 px-2 text-xs font-semibold text-amber-700">
                              Low Stock
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {editingProduct 
                  ? 'Update the product details below.' 
                  : 'Fill in the details to add a new product to your inventory.'}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Apparel">Apparel</SelectItem>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                            <SelectItem value="Home Goods">Home Goods</SelectItem>
                            <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="SKU" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Stock</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reorderLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reorder Level</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Alert when stock is below this level
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Product description" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Products;
