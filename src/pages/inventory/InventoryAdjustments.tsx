
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, Plus, Search, MoreHorizontal, FileText, Filter, Eye } from 'lucide-react';

interface Adjustment {
  id: string;
  reference: string;
  date: string;
  reason: string;
  items: number;
  adjustedBy: string;
  status: 'Completed' | 'Draft' | 'Cancelled';
}

const sampleAdjustments: Adjustment[] = [
  {
    id: '1',
    reference: 'ADJ-001',
    date: '2023-07-15',
    reason: 'Damaged Goods',
    items: 3,
    adjustedBy: 'John Doe',
    status: 'Completed',
  },
  {
    id: '2',
    reference: 'ADJ-002',
    date: '2023-07-12',
    reason: 'Inventory Count',
    items: 12,
    adjustedBy: 'Jane Smith',
    status: 'Completed',
  },
  {
    id: '3',
    reference: 'ADJ-003',
    date: '2023-07-10',
    reason: 'Lost Items',
    items: 2,
    adjustedBy: 'Robert Johnson',
    status: 'Completed',
  },
  {
    id: '4',
    reference: 'ADJ-004',
    date: '2023-07-08',
    reason: 'Damaged in Transit',
    items: 5,
    adjustedBy: 'Emily Davis',
    status: 'Completed',
  },
  {
    id: '5',
    reference: 'ADJ-005',
    date: '2023-07-05',
    reason: 'Quality Control',
    items: 7,
    adjustedBy: 'Michael Wilson',
    status: 'Draft',
  },
  {
    id: '6',
    reference: 'ADJ-006',
    date: '2023-07-02',
    reason: 'Returned by Customer',
    items: 1,
    adjustedBy: 'Sarah Thompson',
    status: 'Cancelled',
  },
];

const InventoryAdjustments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAdjustments, setFilteredAdjustments] = useState<Adjustment[]>(sampleAdjustments);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredAdjustments(sampleAdjustments);
    } else {
      const filtered = sampleAdjustments.filter(
        adjustment => 
          adjustment.reference.toLowerCase().includes(query.toLowerCase()) ||
          adjustment.reason.toLowerCase().includes(query.toLowerCase()) ||
          adjustment.adjustedBy.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAdjustments(filtered);
    }
  };

  // Status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">Completed</Badge>;
      case 'Draft':
        return <Badge variant="outline" className="text-amber-700 border-amber-200 hover:bg-transparent dark:border-amber-700">Draft</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate('/inventory')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Inventory Adjustments</h1>
              <p className="text-muted-foreground mt-1">
                Track and manage stock adjustments and inventory reconciliation
              </p>
            </div>
          </div>
          
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Adjustment</span>
          </Button>
        </div>
        
        <Card className="overflow-hidden shadow-subtle">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 border-b">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search adjustments..."
                  className="pl-10 max-w-sm"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>All Adjustments</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Draft</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead>Adjusted By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdjustments.length > 0 ? (
                    filteredAdjustments.map((adjustment) => (
                      <TableRow key={adjustment.id} className="animate-fade-in">
                        <TableCell className="font-medium">{adjustment.reference}</TableCell>
                        <TableCell>{formatDate(adjustment.date)}</TableCell>
                        <TableCell>{adjustment.reason}</TableCell>
                        <TableCell className="text-right">{adjustment.items}</TableCell>
                        <TableCell>{adjustment.adjustedBy}</TableCell>
                        <TableCell>{getStatusBadge(adjustment.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <FileText className="h-4 w-4" />
                                <span>Print Report</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InventoryAdjustments;
