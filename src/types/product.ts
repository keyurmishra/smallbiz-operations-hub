
export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  reorderLevel: number;
  description: string;
  image?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
}
