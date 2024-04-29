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
  signup: (payload: SignupPayload) => Promise<boolean>;
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
  signin: (payload: SigninPayload) => Promise<boolean>;
  signinSuccess: () => void;
  signinFail: (message: string) => void;
}

const useSignupStore = create<SignupState>((set, get) => ({
  loaded: false,
  success: false,
  message: "",
  signup: async (payload) => {
    set({ loaded: false, success: false });
    // 请求接口
    let isSuccess = false;
    try {
      await axios.post(`${API}/signup`, payload);
      get().signupSuccess();
      isSuccess = true;
    } catch (error: any) {
      console.log(error?.response.data.error);
      get().signupFail(error?.response.data.error);
    }
    return isSuccess;
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
    set({ loaded: false, success: false, message: "" });

    let isSuccess = false;
    // 请求接口
    console.log(payload);

    try {
      let response = await axios.post(`${API}/signin`, payload);
      localStorage.setItem("jwt", JSON.stringify(response.data));
      get().signinSuccess();
      isSuccess = true;
    } catch (error: any) {
      get().signinFail(error?.response.data.error);
      isSuccess = false;
    }
    return isSuccess;
  },
  signinSuccess: () => set({ loaded: true, success: true, message: "" }),
  signinFail: (message) => set({ loaded: true, success: false, message }),
}));

export { useSigninStore, useSignupStore };
