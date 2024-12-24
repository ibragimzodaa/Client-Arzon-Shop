import { axiosRequest } from "@/utils/axios";
import { create } from "zustand";

export const useLoginRegister = create((set) => ({
  handleLogin: async (obj) => {
    try {
      const { data } = await axiosRequest.post(`/Account/login`, obj);
      if (typeof window !== 'undefined') {
        localStorage.setItem("access_token", data.data);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  },
}));
