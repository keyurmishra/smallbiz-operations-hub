
import React from 'react';
import Channel from './Channel';

interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  to: string;
  notifications?: number;
}

interface ChannelCategoryProps {
  category: string;
  items: CategoryItem[];
  currentPath: string;
}

const ChannelCategory = ({ category, items, currentPath }: ChannelCategoryProps) => {
  return (
    <div>
      <h3 className="discord-section-title">{category}</h3>
      <div className="space-y-0.5">
        {items.map(channel => (
          <Channel
            key={channel.id}
            to={channel.to}
            icon={channel.icon}
            label={channel.label}
            notifications={channel.notifications}
            isActive={currentPath === channel.to}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelCategory;
