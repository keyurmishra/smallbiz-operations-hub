
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  Menu,
  Package,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Invoices', path: '/pos' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: Users, label: 'Customers', path: '/customer-management' },
    { icon: Settings, label: 'Settings', path: '/more' },
  ];

  const handleNavClick = (path: string) => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t shadow-lg safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
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
                  : "text-gray-600 hover:text-gray-800"
              )}
              onClick={() => handleNavClick(item.path)}
            >
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
