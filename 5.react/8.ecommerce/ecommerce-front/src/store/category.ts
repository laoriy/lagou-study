import { create } from "zustand";
import { API } from "../config";
import axios from "axios";
import { Category } from "../types/category";

export interface CategoryState {
  loaded: boolean;
  success: boolean;
  result: Category[];
  getCategories: () => void;
}

const useCategoryStore = create<CategoryState>((set, get) => ({
  loaded: false,
  success: false,
  result: [],
  getCategories: async () => {
    set({ loaded: false, success: false, result: [] });
    let isSuccess = false;
    // 请求接口

    try {
      let response = await axios.get(`${API}/categories`);
      set({ loaded: true, success: true, result: response.data });

      isSuccess = true;
    } catch (error: any) {
      isSuccess = false;
    }
    return isSuccess;
  },
}));

export { useCategoryStore };
