
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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

export default Channel;
