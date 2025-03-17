
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Store, User, Lock, Bell, CreditCard, HelpCircle } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and application preferences
          </p>
        </div>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-6 w-full md:w-auto">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="store" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden md:inline">Store</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden md:inline">Help</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details and profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Email Preferences</CardTitle>
                <CardDescription>Manage your email notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Receive emails about new products, features, and more.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive emails about your orders, shipping updates, and more.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive emails about your account security and suspicious activities.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="store" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>Update your store details and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" defaultValue="My Awesome Store" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Input id="storeAddress" defaultValue="123 Main St" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeCity">City</Label>
                    <Input id="storeCity" defaultValue="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeState">State</Label>
                    <Input id="storeState" defaultValue="NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeZip">ZIP Code</Label>
                    <Input id="storeZip" defaultValue="10001" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to enhance security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Secure your account with an additional verification step.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="low-stock" />
                    <Label htmlFor="low-stock">Low Stock Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="new-orders" defaultChecked />
                    <Label htmlFor="new-orders">New Order Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="customer-messages" defaultChecked />
                    <Label htmlFor="customer-messages">Customer Messages</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="system-updates" defaultChecked />
                    <Label htmlFor="system-updates">System Updates</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Update your billing details and subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">Professional Plan - $29.99/month</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">Payment Method</p>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">•••• •••• •••• 4242</p>
                    <Button variant="link" className="text-xs" size="sm">Change</Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">Billing Address</p>
                  <p className="text-sm text-muted-foreground">123 Main St, New York, NY 10001</p>
                  <Button variant="link" className="text-xs p-0" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Get help with using the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Documentation</p>
                  <p className="text-sm text-muted-foreground">View the documentation to learn how to use the application.</p>
                  <Button variant="outline">View Documentation</Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">Contact Support</p>
                  <p className="text-sm text-muted-foreground">Need help? Contact our support team.</p>
                  <Button variant="outline">Contact Support</Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">FAQs</p>
                  <p className="text-sm text-muted-foreground">Find answers to frequently asked questions.</p>
                  <Button variant="outline">View FAQs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
