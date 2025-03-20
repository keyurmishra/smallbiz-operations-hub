
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  isRefreshing?: boolean;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ isRefreshing = false }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing]);

  if (!visible) return null;

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 flex items-center justify-center p-2 z-50 transition-transform duration-300 bg-background/80 backdrop-blur-sm shadow-sm", 
        isRefreshing ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <Loader2 className="animate-spin h-5 w-5 text-primary mr-2" />
      <span className="text-sm font-medium">Refreshing...</span>
    </div>
  );
};

export default PullToRefresh;
