
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Mail, Phone, MapPin } from 'lucide-react';

const DashboardHeader = () => {
  // Mock user data - in a real app, this would come from a user context or API
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    role: 'Shop Owner',
    avatar: '/placeholder.svg',
    status: 'Active',
    lastActive: 'Today at 3:45 PM'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Get an overview of your shop's performance
          </p>
        </div>
        <Button variant="outline" size="sm" className="self-start">
          <Edit className="mr-2 h-4 w-4" />
          Customize Dashboard
        </Button>
      </div>

      <Card className="shadow-sm border-muted/40">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <Badge className="sm:ml-2 w-fit">{user.role}</Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full sm:w-auto flex flex-col items-start gap-2">
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </span>
                {user.status}
              </div>
              <span className="text-xs text-muted-foreground">Last active: {user.lastActive}</span>
              <Button variant="outline" size="sm" className="mt-2">
                <Edit className="mr-2 h-3 w-3" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHeader;
