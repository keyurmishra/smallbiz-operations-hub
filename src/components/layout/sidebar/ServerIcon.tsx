
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

export default ServerIcon;
