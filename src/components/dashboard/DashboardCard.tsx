
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  className,
  cardClassName,
  titleClassName,
  children,
}) => {
  return (
    <Card className={cn("shadow-subtle transition-all duration-300 hover:shadow-elevated", cardClassName)}>
      <CardHeader className="pb-2">
        <CardTitle className={cn("text-xl font-semibold", titleClassName)}>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("pt-2", className)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
