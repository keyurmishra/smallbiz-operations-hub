
import React, { useState, useEffect } from 'react';
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
  CardFooter,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SearchIcon, Plus, Minus, ShoppingCart, CreditCard, DollarSign, Percent, X, Printer, User, ReceiptText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: 'Basic T-shirt',
    category: 'Apparel',
    sku: 'APP-TS-001',
    price: 19.99,
    stock: 45,
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Premium Hoodie',
    category: 'Apparel',
    sku: 'APP-HD-002',
    price: 49.99,
    stock: 28,
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    sku: 'ELC-EB-001',
    price: 89.99,
    stock: 12,
    image: '/placeholder.svg'
  },
  {
    id: '4',
    name: 'Stainless Water Bottle',
    category: 'Accessories',
    sku: 'ACC-WB-001',
    price: 24.99,
    stock: 52,
    image: '/placeholder.svg'
  },
  {
    id: '5',
    name: 'Leather Wallet',
    category: 'Accessories',
    sku: 'ACC-WL-002',
    price: 34.99,
    stock: 18,
    image: '/placeholder.svg'
  },
  {
    id: '6',
    name: 'Smart Watch',
    category: 'Electronics',
    sku: 'ELC-SW-003',
    price: 199.99,
    stock: 7,
    image: '/placeholder.svg'
  },
  {
    id: '7',
    name: 'Running Shoes',
    category: 'Footwear',
    sku: 'FTW-RS-001',
    price: 79.99,
    stock: 15,
    image: '/placeholder.svg'
  },
  {
    id: '8',
    name: 'Coffee Mug',
    category: 'Home Goods',
    sku: 'HG-CM-001',
    price: 12.99,
    stock: 30,
    image: '/placeholder.svg'
  }
];

// Sample customers
const sampleCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-123-4567' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-987-6543' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-456-7890' }
];

type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

const POS = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const categories = ['all', ...Array.from(new Set(sampleProducts.map(p => p.category)))];
  
  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: typeof sampleProducts[0]) => {
    const existingItemIndex = cart.findIndex(item => item.productId === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if already in cart
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      updatedCart[existingItemIndex].total = updatedCart[existingItemIndex].quantity * product.price;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price,
      };
      setCart([...cart, newItem]);
    }
    
    toast({
      description: `${product.name} added to cart`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.price,
        };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;
  
  const handleCheckout = () => {
    toast({
      title: "Sale Complete",
      description: `Total amount: $${total.toFixed(2)}`,
    });
    setCart([]);
    setDiscountPercent(0);
    setPaymentMethod('cash');
    setSelectedCustomer('');
    setIsCheckoutDialogOpen(false);
  };

  const handlePrintReceipt = () => {
    toast({
      description: "Printing receipt...",
    });
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Point of Sale</h1>
            <p className="text-muted-foreground">
              Process sales and manage transactions
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedCustomer ? (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{sampleCustomers.find(c => c.id === selectedCustomer)?.name}</span>
                <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer('')}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsCustomerDialogOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                Select Customer
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Product listing section */}
          <div className="col-span-2 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name or SKU..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-4 overflow-x-auto">
              <TabsList className="inline-flex whitespace-nowrap">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className={activeCategory === category ? "bg-primary text-primary-foreground" : ""}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto flex-1 pb-4">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                  onClick={() => addToCart(product)}
                >
                  <div className="aspect-square bg-secondary/20 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-contain w-full h-full p-4"
                    />
                    {product.stock < 5 && (
                      <Badge 
                        variant="secondary" 
                        className="absolute top-2 right-2 bg-amber-100 text-amber-800"
                      >
                        Low Stock: {product.stock}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-base font-bold">${product.price.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">{product.sku}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full flex items-center justify-center h-40 border rounded-lg bg-muted/10">
                  <p className="text-muted-foreground">No products found</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Cart section */}
          <div className="flex flex-col border rounded-lg overflow-hidden">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-lg flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Current Sale
              </CardTitle>
            </CardHeader>
            
            <div className="flex-1 overflow-y-auto">
              {cart.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="h-full flex items-center justify-center p-6">
                  <div className="text-center text-muted-foreground">
                    <ShoppingCart className="mx-auto h-12 w-12 mb-2 opacity-20" />
                    <p>Your cart is empty</p>
                    <p className="text-sm">Add products to start a sale</p>
                  </div>
                </div>
              )}
            </div>
            
            <CardFooter className="flex flex-col p-4 border-t">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    Discount
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 ml-1"
                      onClick={() => setDiscountPercent(prev => (prev === 0 ? 10 : 0))}
                    >
                      <Percent className="h-3 w-3" />
                    </Button>
                  </span>
                  <span>${discountAmount.toFixed(2)} ({discountPercent}%)</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 w-full mt-4">
                <Button 
                  variant="outline" 
                  disabled={cart.length === 0}
                  onClick={handlePrintReceipt}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Receipt
                </Button>
                <Button 
                  disabled={cart.length === 0}
                  onClick={() => setIsCheckoutDialogOpen(true)}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
      
      {/* Customer selection dialog */}
      <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Customer</DialogTitle>
            <DialogDescription>
              Choose a customer for this sale or continue as a guest.
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[300px] overflow-y-auto">
            <div className="space-y-2">
              {sampleCustomers.map(customer => (
                <div 
                  key={customer.id}
                  className="flex items-center justify-between p-3 rounded-md border hover:bg-accent cursor-pointer"
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setIsCustomerDialogOpen(false);
                  }}
                >
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCustomerDialogOpen(false)}
            >
              Continue as Guest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Checkout dialog */}
      <Dialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Sale</DialogTitle>
            <DialogDescription>
              Select payment method to complete this sale.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`flex flex-col items-center justify-center p-4 rounded-md border cursor-pointer ${
                  paymentMethod === 'cash' ? 'bg-primary/10 border-primary' : 'hover:bg-accent'
                }`}
                onClick={() => setPaymentMethod('cash')}
              >
                <DollarSign 
                  className={`h-8 w-8 mb-2 ${paymentMethod === 'cash' ? 'text-primary' : 'text-muted-foreground'}`} 
                />
                <span className="font-medium">Cash</span>
              </div>
              
              <div
                className={`flex flex-col items-center justify-center p-4 rounded-md border cursor-pointer ${
                  paymentMethod === 'card' ? 'bg-primary/10 border-primary' : 'hover:bg-accent'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard 
                  className={`h-8 w-8 mb-2 ${paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`} 
                />
                <span className="font-medium">Card</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCheckoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCheckout}>
              Complete Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default POS;
