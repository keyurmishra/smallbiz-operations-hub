
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import InventoryHeader from '@/components/inventory/InventoryHeader';
import InventorySearch from '@/components/inventory/InventorySearch';
import InventoryTable from '@/components/inventory/InventoryTable';
import { sampleInventory, InventoryItem } from '@/types/inventory';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(sampleInventory);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredInventory(sampleInventory);
    } else {
      const filtered = sampleInventory.filter(
        item => 
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredInventory(filtered);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <InventoryHeader />
        
        <Card className="overflow-hidden shadow-subtle">
          <CardContent className="p-0">
            <InventorySearch 
              searchQuery={searchQuery} 
              onSearchChange={handleSearch} 
            />
            <InventoryTable inventory={filteredInventory} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Inventory;
