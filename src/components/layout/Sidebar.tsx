
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  UserCog, 
  Receipt, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  subItems?: { to: string; label: string }[];
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, badge, subItems }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (subItems?.some(item => location.pathname === item.to));
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <div className="mb-1">
      <NavLink 
        to={to} 
        className={({ isActive }) => 
          cn(
            "group flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ease-in-out",
            isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
          )
        }
        onClick={(e) => {
          if (subItems?.length) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span className="font-medium">{label}</span>
        </div>
        {badge && (
          <Badge variant="secondary" className={cn(
            "ml-auto transition-colors",
            isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
          )}>
            {badge}
          </Badge>
        )}
        {subItems?.length && (
          <span className="ml-auto pl-2">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </NavLink>
      
      {subItems?.length && isExpanded && (
        <div className="ml-6 mt-1 space-y-1 animate-accordion-down">
          {subItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <aside className={cn(
        "fixed top-0 bottom-0 left-0 z-50 w-64 bg-sidebar border-r transition-transform duration-300 md:translate-x-0 md:z-30 animate-fade-in",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex h-16 items-center px-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 rounded-md p-1.5">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">Shop Monitor</h2>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto py-3 px-3">
            <nav className="space-y-0.5">
              <NavItem 
                to="/" 
                icon={<LayoutDashboard size={18} />} 
                label="Dashboard" 
              />
              <NavItem 
                to="/inventory" 
                icon={<Package size={18} />} 
                label="Inventory" 
                badge={3}
              />
              <NavItem 
                to="/sales" 
                icon={<ShoppingCart size={18} />} 
                label="Sales" 
              />
              <NavItem 
                to="/customers" 
                icon={<Users size={18} />} 
                label="Customers" 
              />
              <NavItem 
                to="/employees" 
                icon={<UserCog size={18} />} 
                label="Employees" 
              />
              <NavItem 
                to="/billing" 
                icon={<Receipt size={18} />} 
                label="Billing & Invoices" 
              />
              <NavItem 
                to="/analytics" 
                icon={<BarChart3 size={18} />} 
                label="Analytics" 
                subItems={[
                  { to: "/analytics/sales", label: "Sales Analytics" },
                  { to: "/analytics/inventory", label: "Inventory Analytics" },
                  { to: "/analytics/customers", label: "Customer Analytics" }
                ]}
              />
            </nav>
            
            <Separator className="my-4" />
            
            <nav className="space-y-0.5">
              <NavItem 
                to="/settings" 
                icon={<Settings size={18} />} 
                label="Settings" 
              />
            </nav>
          </div>
          
          <div className="border-t p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
