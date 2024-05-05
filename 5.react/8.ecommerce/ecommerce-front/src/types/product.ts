import { Category } from "./category";
export interface GetProductPayload {
  sortBy: string;
  order: string;
  limit: number;
}
export interface SearchProductPayload {
  category: string;
  search: string;
}
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  quantity: number;
  sold?: number;
  photo: FormData;
  shipping: boolean;
  createdAt: string;
}

export interface Price {
  id: number;
  name: string;
  array: [number?, number?];
}

export interface FilterPayload {
  order?: string;
  sortBy?: string;
  limit?: number;
  skip: number;
  filters?: {
    category: string[];
    price: number[];
  };
}

export interface Price {
  id: number;
  name: string;
  array: [number?, number?];
}
