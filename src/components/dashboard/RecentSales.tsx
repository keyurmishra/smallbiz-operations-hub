
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface SaleItem {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
  date: string;
}

interface RecentSalesProps {
  sales: SaleItem[];
  className?: string;
}

const RecentSales: React.FC<RecentSalesProps> = ({ sales, className }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-700 hover:bg-transparent">Pending</Badge>;
      case 'refunded':
        return <Badge variant="destructive">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="flex items-center justify-between gap-4 rounded-lg border p-3 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={sale.customer.avatar} alt={sale.customer.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {sale.customer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{sale.customer.name}</p>
              <p className="text-xs text-muted-foreground">{sale.customer.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-medium">{formatCurrency(sale.amount)}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">{sale.date}</p>
              {getStatusBadge(sale.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;
