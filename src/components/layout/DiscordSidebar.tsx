
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  UserCog, 
  Receipt, 
  BarChart3, 
  Settings, 
  Hash, 
  Volume2, 
  CreditCard,
  Inbox,
  MessageSquare,
  Bell,
  PlusCircle
} from 'lucide-react';

interface ServerIconProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  notifications?: number;
  isHome?: boolean;
}

const ServerIcon = ({ active, icon, label, notifications, isHome = false }: ServerIconProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className={cn(
            "discord-server-icon relative group",
            active && "active",
            isHome && "home"
          )}>
            {icon}
            {active && (
              <div className="absolute left-0 top-1/2 w-1 h-10 bg-white rounded-r-md -translate-y-1/2"></div>
            )}
            {notifications && (
              <div className="absolute -bottom-1 -right-1 bg-discord-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {notifications}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-black text-white border-none">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface ChannelProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  notifications?: number;
  isActive?: boolean;
}

const Channel = ({ to, icon, label, notifications, isActive = false }: ChannelProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "discord-channel",
        isActive && "active"
      )}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {notifications && (
        <Badge variant="destructive" className="rounded-full min-w-5 h-5 flex items-center justify-center">
          {notifications}
        </Badge>
      )}
    </Link>
  );
};

const DiscordSidebar = () => {
  const location = useLocation();
  const [activeServerId, setActiveServerId] = useState(1);

  // Mock server data
  const servers = [
    { id: 0, label: "Home", icon: <LayoutDashboard size={24} />, isHome: true },
    { id: 1, label: "Shop Monitor", icon: "SM", notifications: 3 },
    { id: 2, label: "Inventory", icon: "IN" },
    { id: 3, label: "Sales", icon: "SA" },
    { id: 4, label: "Analytics", icon: "AN" },
    { id: 5, label: "Add Server", icon: <PlusCircle size={24} /> }
  ];

  // Mock channels data for the active server
  const channels = [
    { 
      category: "SHOP INFORMATION",
      items: [
        { id: 'announcements', label: 'Announcements', icon: <Bell size={18} />, to: '/' },
        { id: 'general', label: 'General', icon: <Hash size={18} />, to: '/', notifications: 5 },
        { id: 'inventory', label: 'Inventory', icon: <Package size={18} />, to: '/inventory' }
      ]
    },
    {
      category: "SALES",
      items: [
        { id: 'sales-general', label: 'Sales Dashboard', icon: <ShoppingCart size={18} />, to: '/sales' },
        { id: 'pos', label: 'Point of Sale', icon: <CreditCard size={18} />, to: '/pos' },
        { id: 'invoices', label: 'Invoices', icon: <Receipt size={18} />, to: '/billing' }
      ]
    },
    {
      category: "PEOPLE",
      items: [
        { id: 'customers', label: 'Customers', icon: <Users size={18} />, to: '/customers' },
        { id: 'employees', label: 'Employees', icon: <UserCog size={18} />, to: '/employees' }
      ]
    },
    {
      category: "DATA",
      items: [
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} />, to: '/analytics' },
        { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} />, to: '/more', notifications: 2 },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} />, to: '/settings' }
      ]
    }
  ];

  return (
    <div className="flex h-screen">
      {/* Servers sidebar - Discord's left sidebar with icons */}
      <div className="w-[72px] bg-discord-dark flex flex-col items-center py-3 overflow-y-auto hide-scrollbar border-r border-discord-darker">
        {servers.map(server => (
          <ServerIcon
            key={server.id}
            active={activeServerId === server.id}
            icon={typeof server.icon === 'string' 
              ? <div className="font-bold text-lg">{server.icon}</div> 
              : server.icon
            }
            label={server.label}
            notifications={server.notifications}
            isHome={server.isHome}
            />
        ))}
      </div>
      
      {/* Channels sidebar - Discord's second sidebar with channels list */}
      <div className="w-60 bg-discord-lighter flex flex-col overflow-hidden">
        <div className="h-12 min-h-[3rem] border-b border-discord-dark shadow-sm flex items-center px-4">
          <h2 className="font-bold text-white">Shop Monitor</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {channels.map(category => (
            <div key={category.category}>
              <h3 className="discord-section-title">{category.category}</h3>
              <div className="space-y-0.5">
                {category.items.map(channel => (
                  <Channel
                    key={channel.id}
                    to={channel.to}
                    icon={channel.icon}
                    label={channel.label}
                    notifications={channel.notifications}
                    isActive={location.pathname === channel.to}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Discord-like user area */}
        <div className="h-[52px] bg-discord-dark/50 mt-auto flex items-center px-2 gap-2">
          <div className="w-8 h-8 rounded-full bg-discord-primary flex items-center justify-center text-white">
            JD
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">John Doe</div>
            <div className="text-xs text-discord-muted-text">#admin1234</div>
          </div>
          <div className="flex gap-1.5">
            <button className="text-discord-muted-text hover:text-discord-text">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordSidebar;
