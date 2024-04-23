import { create } from "zustand";
import { API } from "../config";
import axios from "axios";
export interface AuthState {
  loaded: boolean;
  success: boolean;
  message: string;
}
/**
 * 注册
 */
export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const RESET_SIGNUP = "RESET_SIGNUP";

export interface SignupPayload {
  email: string;
  name: string;
  password: string;
}

interface SignupState extends AuthState {
  signup: (payload: SignupPayload) => void;
  signupSuccess: () => void;
  signupFail: (message: string) => void;
  resetSignup: () => void;
}

/**
 * 登录
 */

export const SIGNIN = "SIGNIN";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAIL = "SIGNIN_FAIL";

export interface SigninPayload {
  email: string;
  password: string;
}

interface SigninState extends AuthState {
  signin: (payload: SigninPayload) => void;
  signinSuccess: () => void;
  signinFail: (message: string) => void;
}

const useSignupStore = create<SignupState>((set, get) => ({
  loaded: false,
  success: false,
  message: "",
  signup: async (payload) => {
    // 请求接口
    console.log(payload);
    try {
      await axios.post(`${API}/signup`, payload);
      get().signupSuccess();
    } catch (error: any) {
      get().signupFail(error?.response.data.error);
    }
    set({ loaded: false, success: false });
  },
  signupSuccess: () => set({ loaded: true, success: true }),
  signupFail: (message) => set({ loaded: true, success: false, message }),
  resetSignup: () => set({ loaded: false, success: false, message: "" }),
}));

const useSigninStore = create<SigninState>((set, get) => ({
  loaded: false,
  success: false,
  message: "",
  signin: async (payload) => {
    // 请求接口
    console.log(payload);

    try {
      let response = await axios.post(`${API}/signin`, payload);
      localStorage.setItem("jwt", JSON.stringify(response.data));
      get().signinSuccess();
    } catch (error: any) {
      get().signinFail(error?.response.data.error);
    }

    set({ loaded: false, success: false, message: "" });
  },
  signinSuccess: () => set({ loaded: true, success: true, message: "" }),
  signinFail: (message) => set({ loaded: true, success: false, message }),
}));

export { useSigninStore, useSignupStore };
