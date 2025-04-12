
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import ProfileScene from '@/components/3d/ProfileScene';
import { 
  Settings, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Bell, 
  UserCircle,
  ChevronRight,
  Store,
  Shield,
  Smartphone,
  Moon,
  Sun
} from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

const More = () => {
  const navigate = useNavigate();
  const { isIOS, isAndroid, isStandalone } = useMobile();
  const [isDarkMode, setIsDarkMode] = React.useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  React.useEffect(() => {
    // Set up a listener for system theme changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    // Toggle dark mode
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Apply dark mode to document
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
  };

  // Organize menu items into sections
  const accountItems = [
    { 
      icon: UserCircle, 
      label: 'My Profile', 
      description: 'View and update your profile',
      action: () => navigate('/profile') 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      description: 'Manage your notification settings',
      action: () => navigate('/settings')
    },
  ];
  
  const preferencesItems = [
    { 
      icon: isDarkMode ? Sun : Moon, 
      label: 'Appearance', 
      description: `Switch to ${isDarkMode ? 'light' : 'dark'} mode`,
      action: toggleDarkMode,
      toggle: true,
      toggleState: isDarkMode
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      description: 'App preferences and configurations',
      action: () => navigate('/settings') 
    },
  ];
  
  const businessItems = [
    { 
      icon: Store, 
      label: 'Business Profile', 
      description: 'Manage your company details',
      action: () => navigate('/settings') 
    },
    { 
      icon: CreditCard, 
      label: 'Billing', 
      description: 'Manage payment methods and subscriptions',
      action: () => navigate('/billing') 
    },
  ];
  
  const supportItems = [
    { 
      icon: Smartphone, 
      label: 'App Information', 
      description: `Version 1.0.0 • ${isIOS ? 'iOS' : isAndroid ? 'Android' : 'Web'}`,
      action: () => console.log('App info clicked') 
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      description: 'Get assistance and view documentation',
      action: () => console.log('Help clicked') 
    },
    { 
      icon: Shield, 
      label: 'Privacy Policy', 
      description: 'How we protect your data',
      action: () => console.log('Privacy clicked') 
    },
  ];
  
  const dangerItems = [
    { 
      icon: LogOut, 
      label: 'Logout', 
      description: 'Sign out of your account',
      action: () => navigate('/login'),
      danger: true
    },
  ];

  const renderSection = (title: string, items: any[]) => (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground px-1">{title}</h2>
      {items.map((item, index) => (
        <Card 
          key={index} 
          className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer active:bg-accent ${item.danger ? 'hover:bg-destructive/10 active:bg-destructive/20' : ''}`}
          onClick={() => {
            // Add haptic feedback if available on touch
            if (navigator.vibrate) {
              navigator.vibrate(5);
            }
            item.action();
          }}
        >
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${item.danger ? 'bg-destructive/10 text-destructive' : 'bg-muted'}`}>
              <item.icon size={20} />
            </div>
            <div className="ml-4 flex-1">
              <h3 className={`font-medium ${item.danger ? 'text-destructive' : ''}`}>{item.label}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
            {item.toggle ? (
              <div 
                className={`w-12 h-6 rounded-full p-1 transition-colors ${item.toggleState ? 'bg-primary' : 'bg-muted'}`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white transform transition-transform ${item.toggleState ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </div>
            ) : (
              <ChevronRight size={18} className="text-muted-foreground" />
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6 pb-6">
        <h1 className="text-2xl font-bold tracking-tight">More Options</h1>
        
        {/* 3D Profile Avatar */}
        <Card className="overflow-hidden">
          <ProfileScene />
        </Card>
        
        {renderSection('Account', accountItems)}
        {renderSection('Preferences', preferencesItems)}
        {renderSection('Business', businessItems)}
        {renderSection('Support', supportItems)}
        {renderSection('', dangerItems)}
      </div>
    </Layout>
  );
};

export default More;
