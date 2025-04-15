
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  Bell, 
  MessageSquare,
  PlusCircle,
  CreditCard
} from 'lucide-react';
import ServerIcon from './sidebar/ServerIcon';
import ChannelCategory from './sidebar/ChannelCategory';
import UserSection from './sidebar/UserSection';

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
      {/* Servers sidebar */}
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
      
      {/* Channels sidebar */}
      <div className="w-60 bg-discord-lighter flex flex-col overflow-hidden">
        <div className="h-12 min-h-[3rem] border-b border-discord-dark shadow-sm flex items-center px-4">
          <h2 className="font-bold text-white">Shop Monitor</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {channels.map(category => (
            <ChannelCategory
              key={category.category}
              category={category.category}
              items={category.items}
              currentPath={location.pathname}
            />
          ))}
        </div>
        
        <UserSection />
      </div>
    </div>
  );
};

export default DiscordSidebar;
