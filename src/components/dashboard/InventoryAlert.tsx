
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface InventoryAlertItem {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
  threshold: number;
  status: 'low' | 'critical' | 'expired';
}

interface InventoryAlertProps {
  items: InventoryAlertItem[];
  className?: string;
}

const InventoryAlert: React.FC<InventoryAlertProps> = ({ items, className }) => {
  // Filter the alerts by urgency if needed
  const criticalItems = items.filter(item => item.status === 'critical');
  const lowItems = items.filter(item => item.status === 'low');
  const expiredItems = items.filter(item => item.status === 'expired');
  
  const getStatusColors = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'low':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'expired':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-2" />
          <h3 className="font-medium text-lg">All Good!</h3>
          <p className="text-muted-foreground">
            No inventory alerts at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                  <AlertTriangle className={cn(
                    "h-5 w-5",
                    item.status === 'critical' ? "text-red-500" : 
                    item.status === 'low' ? "text-amber-500" : "text-purple-500"
                  )} />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.category} • Stock: {item.stockLevel}/{item.threshold}
                  </p>
                </div>
              </div>
              <Badge className={cn("px-2", getStatusColors(item.status))}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryAlert;
