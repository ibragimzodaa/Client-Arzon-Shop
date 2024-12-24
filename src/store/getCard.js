 import {create} from 'zustand'
import axios from 'axios'
import { axiosRequest } from '@/utils/axios';
let api = "http://localhost:2000/data"

export const useCard = create((set,get) => ({ 
  data: [],
  getCard : async() => {
    try {
      let {data} = await axiosRequest.get(`/Cart/get-products-from-cart`)
      set({data:data.data})
      console.log({data:data.data});
      
    } catch (error) {
      console.error(error);
    }
  },
  postCard: async(id) =>{
    try {
        let { data } = await axiosRequest.post(`/Cart/add-product-to-cart?id=${id}`);
      } catch (error) {
        console.error(error);
      }
    },
    incresNum: async (id) => {
      try {
        const { data } = await axiosRequest.put(
          `/Cart/increase-product-in-cart?id=${id}`
        );
        get().getCard()
      } catch (error) {
        console.log("Error fetching AddCard:", error);
      }
    },
    decresNum: async (id) => {
      try {
        const { data } = await axiosRequest.put(
          `/Cart/reduce-product-in-cart?id=${id}`
        );
        get().getCard()
      } catch (error) {
        console.log("Error fetching AddCard:", error);
      }
    },
    deleteCard: async (id) => {
      try {
        const { data } = await axiosRequest.delete(
          `/Cart/delete-product-from-cart?id=${id}`
        );
        get().getCard()
      } catch (error) {
        console.log("Error fetching AddCard:", error);
      }
    },
    deleteAllCard: async (id) => {
      try {
        const { data } = await axiosRequest.delete(`/Cart/clear-cart`);
        set({ dataCard: data.data.products });
      } catch (error) {
        console.log("Error fetching AddCard:", error);
      }
    },
    status : false,
    setStatus : () => set((state) => ({status : !state.status})),
    cnt : 0,
    setCnt : () => set((state) => ({cnt : state}))

  }))
