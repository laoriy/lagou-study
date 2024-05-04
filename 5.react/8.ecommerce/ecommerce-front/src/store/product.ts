import { SearchProductPayload } from "./../types/product";
import { create } from "zustand";
import { API } from "../config";
import axios from "axios";
import { Category } from "../types/category";
import { GetProductPayload, Product } from "../types/product";

export interface ProductState {
  createdAt: {
    loaded: boolean;
    success: boolean;
    products: Product[];
  };
  sold: {
    loaded: boolean;
    success: boolean;
    products: Product[];
  };
  search: Product[];
  filter: {
    loaded: boolean;
    success: boolean;
    result: {
      size: number;
      data: Product[];
    };
  };
  product: {
    loaded: boolean;
    success: boolean;
    result: Product;
  };
  handleGetProduct: (p: GetProductPayload) => void;
  handleSearchProduct: (p: SearchProductPayload) => void;
}

const useProductStore = create<ProductState>((set, get) => ({
  createdAt: {
    loaded: false,
    success: false,
    products: [],
  },
  sold: {
    loaded: false,
    success: false,
    products: [],
  },
  search: [],
  filter: {
    success: false,
    loaded: false,
    result: {
      size: 0,
      data: [],
    },
  },
  product: {
    loaded: false,
    success: false,
    result: {
      _id: "",
      name: "",
      price: 0,
      description: "",
      category: {
        _id: "",
        name: "",
      },
      quantity: 0,
      sold: 0,
      photo: new FormData(),
      shipping: false,
      createdAt: "",
    },
  },
  handleGetProduct: async ({ sortBy, order, limit }: GetProductPayload) => {
    let isSuccess = false;
    // 请求接口
    const sortType = sortBy === "createdAt" ? "createdAt" : "sold";
    set({ [sortType]: { ...get()[sortType], loaded: false, success: false } });
    try {
      let response = await axios.get<Product[]>(`${API}/products`, {
        params: { sortBy, order, limit },
      });

      set({
        [sortType]: { loaded: true, success: true, products: response.data },
      });

      isSuccess = true;
    } catch (error: any) {
      isSuccess = false;
    }
    return isSuccess;
  },
  async handleSearchProduct({ search, category }: SearchProductPayload) {
    let response = await axios.get(`${API}/products/search`, {
      params: { search, category },
    });
    set({ search: response.data });
  },
}));

export const getProduct = (
  sortBy: string,
  order: string = "desc",
  limit: number = 10
): GetProductPayload => ({
  sortBy,
  order,
  limit,
});

export { useProductStore };
