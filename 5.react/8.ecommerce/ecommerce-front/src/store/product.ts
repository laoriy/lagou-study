import { create } from "zustand";
import { API } from "../config";
import axios from "axios";
import { Category } from "../types/category";
import { GetProductAction, Product } from "../types/product";

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
  handleGetProduct: (p: GetProductAction) => void;
}

const useCategoryStore = create<ProductState>((set, get) => ({
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
  handleGetProduct: async ({ sortBy, order, limit }: GetProductAction) => {
    let isSuccess = false;
    // 请求接口
    const sortType = sortBy === "createdAt" ? "createdAt" : "sold";
    set({ [sortType]: { loaded: false, success: false } });
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
}));

export { useCategoryStore };
