
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart4, 
  Menu 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: ShoppingCart, label: 'Sales', path: '/sales' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: BarChart4, label: 'Analytics', path: '/analytics' },
    { icon: Menu, label: 'More', path: '/more' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t shadow-lg safe-area-bottom">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || 
                         (item.path !== '/' && currentPath.startsWith(item.path));
          return (
            <button
              key={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon size={20} className={isActive ? "animate-pulse-subtle" : ""} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
