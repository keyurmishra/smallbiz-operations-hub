
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package, Truck, History, BarChart3, Edit, Save, Tag, AlertTriangle } from 'lucide-react';

// Sample inventory item data, would be fetched from API in a real app
const sampleInventoryItems = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    sku: 'IP14P-001',
    barcode: '123456789012',
    category: 'Electronics',
    tags: ['Apple', 'Smartphone', 'Premium'],
    description: 'Latest iPhone model with advanced features and sleek design.',
    price: 999.99,
    costPrice: 799.99,
    stock: 2,
    lowStockThreshold: 5,
    reorderPoint: 3,
    status: 'Low Stock',
    location: 'Warehouse A, Shelf B12',
    supplier: 'Apple Inc.',
    lastOrdered: '2023-06-15',
    imageUrl: 'https://placehold.co/400x400',
    transactions: [
      { date: '2023-07-10', type: 'Sale', quantity: 1, reference: 'ORD-0012' },
      { date: '2023-07-01', type: 'Purchase', quantity: 3, reference: 'PO-0023' },
      { date: '2023-06-15', type: 'Adjustment', quantity: -1, reference: 'ADJ-0007' }
    ]
  },
  {
    id: '2',
    name: 'Samsung Galaxy S22',
    sku: 'SGS22-002',
    barcode: '987654321098',
    category: 'Electronics',
    tags: ['Samsung', 'Smartphone', 'Android'],
    description: 'High-performance Android smartphone with excellent camera.',
    price: 799.99,
    costPrice: 599.99,
    stock: 5,
    lowStockThreshold: 5,
    reorderPoint: 3,
    status: 'Low Stock',
    location: 'Warehouse A, Shelf B14',
    supplier: 'Samsung Electronics',
    lastOrdered: '2023-06-22',
    imageUrl: 'https://placehold.co/400x400',
    transactions: [
      { date: '2023-07-15', type: 'Sale', quantity: 2, reference: 'ORD-0015' },
      { date: '2023-06-22', type: 'Purchase', quantity: 7, reference: 'PO-0025' }
    ]
  }
];

const InventoryItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the inventory item based on the ID from the URL
  const item = sampleInventoryItems.find(item => item.id === id);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);
  
  if (!item) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Item Not Found</h2>
          <p className="text-muted-foreground mb-4">The inventory item you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/inventory')}>
            Back to Inventory
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    // Here you would save the changes to your backend
    // For now, we'll just toggle the editing state
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    // Reset to original values
    setEditedItem(item);
    setIsEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedItem(prev => prev ? { ...prev, [name]: value } : null);
  };
  
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
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate('/inventory')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{item.name}</h1>
              <p className="text-muted-foreground mt-1">
                SKU: {item.sku} | Barcode: {item.barcode}
              </p>
            </div>
          </div>
          
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button className="flex items-center gap-2" onClick={handleSave}>
                <Save size={16} />
                <span>Save Changes</span>
              </Button>
            </div>
          ) : (
            <Button className="flex items-center gap-2" onClick={handleEdit}>
              <Edit size={16} />
              <span>Edit Item</span>
            </Button>
          )}
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 shadow-subtle">
            <CardHeader className="pb-3">
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details" className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>Details</span>
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="flex items-center gap-1">
                    <History className="h-4 w-4" />
                    <span>Transaction History</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  {isEditing ? (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={editedItem?.name} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input 
                          id="category" 
                          name="category" 
                          value={editedItem?.category} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input 
                          id="sku" 
                          name="sku" 
                          value={editedItem?.sku} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="barcode">Barcode</Label>
                        <Input 
                          id="barcode" 
                          name="barcode" 
                          value={editedItem?.barcode} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Sale Price</Label>
                        <Input 
                          id="price" 
                          name="price" 
                          type="number" 
                          value={editedItem?.price} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="costPrice">Cost Price</Label>
                        <Input 
                          id="costPrice" 
                          name="costPrice" 
                          type="number" 
                          value={editedItem?.costPrice} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stock">Current Stock</Label>
                        <Input 
                          id="stock" 
                          name="stock" 
                          type="number" 
                          value={editedItem?.stock} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                        <Input 
                          id="lowStockThreshold" 
                          name="lowStockThreshold" 
                          type="number" 
                          value={editedItem?.lowStockThreshold} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={editedItem?.location} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="supplier">Supplier</Label>
                        <Input 
                          id="supplier" 
                          name="supplier" 
                          value={editedItem?.supplier} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          name="description" 
                          rows={4} 
                          value={editedItem?.description} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div>
                          <h3 className="font-medium text-muted-foreground mb-2">Basic Information</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Category:</span>
                              <span className="font-medium">{item.category}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">SKU:</span>
                              <span className="font-medium">{item.sku}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Barcode:</span>
                              <span className="font-medium">{item.barcode}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Status:</span>
                              <span>{getStatusBadge(item.status)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-muted-foreground mb-2">Pricing</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Sale Price:</span>
                              <span className="font-medium">{formatCurrency(item.price)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Cost Price:</span>
                              <span className="font-medium">{formatCurrency(item.costPrice)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Profit Margin:</span>
                              <span className="font-medium">
                                {Math.round(((item.price - item.costPrice) / item.price) * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div>
                          <h3 className="font-medium text-muted-foreground mb-2">Inventory</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Current Stock:</span>
                              <span className="font-medium">{item.stock} units</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Low Stock Threshold:</span>
                              <span className="font-medium">{item.lowStockThreshold} units</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Reorder Point:</span>
                              <span className="font-medium">{item.reorderPoint} units</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Location:</span>
                              <span className="font-medium">{item.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-muted-foreground mb-2">Supplier Information</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Supplier:</span>
                              <span className="font-medium">{item.supplier}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-muted-foreground">Last Ordered:</span>
                              <span className="font-medium">{item.lastOrdered}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-muted-foreground mb-2">Description</h3>
                        <p>{item.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-muted-foreground mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              <Tag size={12} />
                              <span>{tag}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="transactions">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 py-3 px-4 font-medium border-b">
                      <div>Date</div>
                      <div>Type</div>
                      <div className="text-right">Quantity</div>
                      <div>Reference</div>
                    </div>
                    {item.transactions.map((transaction, index) => (
                      <div key={index} className="grid grid-cols-4 py-3 px-4 border-b last:border-b-0">
                        <div>{transaction.date}</div>
                        <div>{transaction.type}</div>
                        <div className={`text-right ${transaction.type === 'Sale' || transaction.quantity < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {transaction.quantity > 0 && transaction.type !== 'Sale' ? '+' : ''}
                          {transaction.quantity}
                        </div>
                        <div>{transaction.reference}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics">
                  <div className="flex flex-col items-center justify-center p-12 text-center space-y-3">
                    <BarChart3 className="h-10 w-10 text-muted-foreground" />
                    <h3 className="font-medium text-lg">Item Analytics</h3>
                    <p className="text-muted-foreground max-w-md">
                      View sales trends, performance metrics, and other analytics for this product over time.
                    </p>
                    <Button disabled className="mt-2">Coming Soon</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="shadow-subtle">
              <CardHeader className="pb-3">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Truck className="h-4 w-4 mr-2" />
                  Create Purchase Order
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <History className="h-4 w-4 mr-2" />
                  Adjust Stock
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-subtle overflow-hidden">
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="object-contain max-h-full" />
                ) : (
                  <Package className="h-24 w-24 text-muted-foreground/40" />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InventoryItem;
