
import React from 'react';
import { Settings } from 'lucide-react';

const UserSection = () => {
  return (
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
  );
};

export default UserSection;
