import { SearchProductPayload } from "./../types/product";
import { create } from "zustand";
import { API } from "../config";
import axios from "axios";
import { Category } from "../types/category";
import { GetProductPayload, Product, FilterPayload } from "../types/product";

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
  handleFilterProduct(payload: FilterPayload): Promise<void>;
  handleGetProductById(productId: string): Promise<void>;
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
  async handleFilterProduct(payload: FilterPayload) {
    set({
      filter: {
        ...get().filter,
        loaded: false,
        success: false,
        result: {
          size: 0,
          data: get().filter.result.data,
        },
      },
    });

    let response = await axios.post(`${API}/products/filter`, payload);

    let data =
      payload.skip === 0
        ? response.data.data
        : [...get().filter.result.data, ...response.data.data];

    set({
      filter: {
        loaded: true,
        success: true,
        result: {
          size: response.data.data.length,
          data,
        },
      },
    });
  },
  async handleGetProductById(productId: string) {
    set({ product: { ...get().product, loaded: false, success: false } });
    let response = await axios.get(`${API}/product/${productId}`);
    set({ product: { loaded: true, success: true, result: response.data } });
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
