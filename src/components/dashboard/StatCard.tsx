
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string | number;
    positive?: boolean;
  };
  className?: string;
  iconColor?: string;
  trendLabel?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  className,
  iconColor = 'text-primary',
  trendLabel = 'vs. last period',
}) => {
  return (
    <div className={cn(
      "flex p-6 rounded-lg border bg-card text-card-foreground shadow-subtle transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight animate-fade-in">{value}</h3>
        
        {change && (
          <div className="mt-2 flex items-center gap-1">
            <Badge variant={change.positive ? "default" : "destructive"} className={cn(
              "px-1.5 text-xs h-5",
              change.positive ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" : ""
            )}>
              {change.positive ? "+" : ""}{change.value}%
            </Badge>
            <span className="text-xs text-muted-foreground">{trendLabel}</span>
          </div>
        )}
      </div>
      
      <div className={cn(
        "flex items-center justify-center h-12 w-12 rounded-full", 
        iconColor === 'text-primary' ? "bg-primary/10" : "bg-secondary"
      )}>
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
    </div>
  );
};

export default StatCard;
