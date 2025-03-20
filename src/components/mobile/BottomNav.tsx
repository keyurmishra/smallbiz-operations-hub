
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

  const handleNavClick = (path: string) => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
    navigate(path);
  };

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
                "flex flex-col items-center justify-center space-y-1 transition-colors relative overflow-hidden",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleNavClick(item.path)}
            >
              <span className={cn(
                "absolute inset-0 opacity-0 bg-primary/10 rounded-full",
                isActive ? "animate-pulse-subtle opacity-10" : ""
              )} />
              <item.icon 
                size={20} 
                className={cn(
                  "transition-transform",
                  isActive ? "scale-110" : ""
                )} 
              />
              <span className={cn(
                "text-xs font-medium transition-all",
                isActive ? "font-semibold" : ""
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
