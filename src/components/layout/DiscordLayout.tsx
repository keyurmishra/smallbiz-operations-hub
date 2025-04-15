import React, { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DiscordSidebar from './DiscordSidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Bell, Pin, Inbox, HelpCircle, Hash } from 'lucide-react';
import ChatBot from '../chat/ChatBot';

const getChannelName = (pathname: string) => {
  const routes: Record<string, string> = {
    '/': 'general',
    '/inventory': 'inventory',
    '/sales': 'sales-dashboard',
    '/pos': 'point-of-sale',
    '/customers': 'customers',
    '/customer-management': 'customer-management',
    '/employees': 'employees',
    '/billing': 'invoices',
    '/analytics': 'analytics',
    '/settings': 'settings',
    '/more': 'messages'
  };
  
  return routes[pathname] || 'general';
};

const DiscordLayout = () => {
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const channelName = getChannelName(location.pathname);
  
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Include the Discord-style sidebar */}
      <DiscordSidebar />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 bg-discord-light overflow-hidden">
        {/* Channel header */}
        <header className="h-12 min-h-[3rem] border-b border-discord-dark flex items-center px-4 justify-between bg-discord-light">
          <div className="flex items-center gap-2">
            <Hash size={20} className="text-discord-muted-text" />
            <span className="font-bold text-white">{channelName}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-discord-muted-text hover:text-white">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-discord-muted-text hover:text-white">
              <Pin size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-discord-muted-text hover:text-white">
              <Users size={20} />
            </Button>
            <div className="relative w-40">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-discord-muted-text" size={16} />
              <Input
                placeholder="Search"
                className="bg-discord-darker text-discord-text pl-8 h-6 focus:ring-1 focus:ring-white/20"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-discord-muted-text hover:text-white">
              <Inbox size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-discord-muted-text hover:text-white">
              <HelpCircle size={20} />
            </Button>
          </div>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div ref={mainContentRef} className="flex-1 overflow-y-auto">
            <div className="p-4">
              <Outlet />
            </div>
          </div>
          
          {/* Members sidebar - Discord's right sidebar showing online users */}
          <div className="w-60 bg-discord-lighter border-l border-discord-dark p-4 overflow-y-auto">
            <h3 className="discord-section-title mb-2">ONLINE — 5</h3>
            
            {/* Online users */}
            {[
              { id: 1, name: 'John Doe', status: 'Admin', avatar: 'JD' },
              { id: 2, name: 'Sarah Smith', status: 'Manager', avatar: 'SS' },
              { id: 3, name: 'Mike Johnson', status: 'Sales', avatar: 'MJ' },
              { id: 4, name: 'Emily Brown', status: 'Inventory', avatar: 'EB' },
              { id: 5, name: 'Alex Wilson', status: 'Support', avatar: 'AW' }
            ].map(user => (
              <div key={user.id} className="discord-user-item">
                <Avatar className="h-8 w-8 border-2 border-discord-green">
                  <AvatarImage src="/placeholder.svg" alt={user.name} />
                  <AvatarFallback className="bg-discord-primary text-white">{user.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-discord-text text-sm font-medium">{user.name}</p>
                  <p className="text-discord-muted-text text-xs">{user.status}</p>
                </div>
              </div>
            ))}
            
            <h3 className="discord-section-title mt-6 mb-2">OFFLINE — 2</h3>
            
            {/* Offline users */}
            {[
              { id: 6, name: 'Robert Jones', status: 'Developer', avatar: 'RJ' },
              { id: 7, name: 'Lisa King', status: 'Marketing', avatar: 'LK' }
            ].map(user => (
              <div key={user.id} className="discord-user-item opacity-60">
                <Avatar className="h-8 w-8 grayscale">
                  <AvatarImage src="/placeholder.svg" alt={user.name} />
                  <AvatarFallback className="bg-discord-darker text-discord-muted-text">{user.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-discord-muted-text text-sm font-medium">{user.name}</p>
                  <p className="text-discord-muted-text text-xs">{user.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Keep the existing ChatBot component */}
      <ChatBot />
    </div>
  );
};

export default DiscordLayout;
