
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServerIcon from './sidebar/ServerIcon';
import ChannelCategory from './sidebar/ChannelCategory';
import UserSection from './sidebar/UserSection';
import { servers } from '@/data/serverData';
import { channels } from '@/data/channelData';

const DiscordSidebar = () => {
  const location = useLocation();
  const [activeServerId, setActiveServerId] = useState(1);

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
