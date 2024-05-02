import { Category } from "./category";
export interface GetProductAction {
  sortBy: string;
  order: string;
  limit: number;
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
