
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { 
  Settings, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Bell, 
  UserCircle,
  ChevronRight
} from 'lucide-react';

const More = () => {
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: UserCircle, 
      label: 'My Profile', 
      description: 'View and update your profile',
      action: () => console.log('Profile clicked') 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      description: 'Manage your notification settings',
      action: () => console.log('Notifications clicked') 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      description: 'App preferences and configurations',
      action: () => navigate('/settings') 
    },
    { 
      icon: CreditCard, 
      label: 'Billing', 
      description: 'Manage payment methods and subscriptions',
      action: () => navigate('/billing') 
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      description: 'Get assistance and view documentation',
      action: () => console.log('Help clicked') 
    },
    { 
      icon: LogOut, 
      label: 'Logout', 
      description: 'Sign out of your account',
      action: () => console.log('Logout clicked'),
      danger: true
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">More Options</h1>
        
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Card 
              key={index} 
              className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer ${item.danger ? 'hover:bg-destructive/10' : ''}`}
              onClick={item.action}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${item.danger ? 'bg-destructive/10 text-destructive' : 'bg-muted'}`}>
                  <item.icon size={20} />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className={`font-medium ${item.danger ? 'text-destructive' : ''}`}>{item.label}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default More;
