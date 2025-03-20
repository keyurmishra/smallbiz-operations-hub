
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export const sampleInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    category: 'Electronics',
    price: 999.99,
    stock: 2,
    status: 'Low Stock',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S22',
    category: 'Electronics',
    price: 799.99,
    stock: 5,
    status: 'Low Stock',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    category: 'Audio',
    price: 349.99,
    stock: 0,
    status: 'Out of Stock',
  },
  {
    id: '4',
    name: 'MacBook Pro 16"',
    category: 'Computers',
    price: 2399.99,
    stock: 8,
    status: 'In Stock',
  },
  {
    id: '5',
    name: 'iPad Air',
    category: 'Tablets',
    price: 599.99,
    stock: 12,
    status: 'In Stock',
  },
  {
    id: '6',
    name: 'Apple Watch Series 8',
    category: 'Wearables',
    price: 399.99,
    stock: 3,
    status: 'Low Stock',
  },
  {
    id: '7',
    name: 'AirPods Pro',
    category: 'Audio',
    price: 249.99,
    stock: 7,
    status: 'In Stock',
  },
  {
    id: '8',
    name: 'Dell XPS 13',
    category: 'Computers',
    price: 1199.99,
    stock: 6,
    status: 'In Stock',
  },
];
