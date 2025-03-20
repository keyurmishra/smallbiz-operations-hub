
import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ 
  isRefreshing = false, 
  onRefresh 
}) => {
  const [visible, setVisible] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const maxPullDistance = 80;
  const pullThreshold = 60;
  const refreshIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRefreshing) {
      setVisible(true);
      setPullDistance(0);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
        setPullDistance(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing]);

  const getProgressPercentage = () => {
    const percentage = Math.min(100, (pullDistance / pullThreshold) * 100);
    return percentage;
  };

  return (
    <div 
      ref={refreshIndicatorRef}
      className={cn(
        "fixed top-0 left-0 right-0 flex items-center justify-center p-2 z-50 transition-all duration-300 bg-background/80 backdrop-blur-sm shadow-sm", 
        visible || pullDistance > 0 ? "translate-y-0" : "-translate-y-full",
        isRefreshing ? "h-14" : ""
      )}
      style={{ 
        height: !isRefreshing ? `${Math.min(pullDistance, maxPullDistance)}px` : undefined,
        opacity: visible ? 1 : Math.min(1, pullDistance / 30)
      }}
    >
      {isRefreshing ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 text-primary mr-2" />
          <span className="text-sm font-medium">Refreshing...</span>
        </>
      ) : (
        <>
          <div className={cn(
            "w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center transition-transform",
            pullDistance > pullThreshold ? "scale-110" : ""
          )}>
            <div 
              className="h-4 w-4 rounded-full bg-primary transition-transform" 
              style={{ 
                transform: `scale(${Math.min(1, getProgressPercentage() / 100)})`,
              }}
            />
          </div>
          <span className="ml-2 text-xs font-medium text-muted-foreground">
            {pullDistance > pullThreshold ? "Release to refresh" : "Pull down to refresh"}
          </span>
        </>
      )}
    </div>
  );
};

export default PullToRefresh;
