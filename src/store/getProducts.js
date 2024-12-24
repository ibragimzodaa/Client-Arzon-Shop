 import {create} from 'zustand'
import axios from 'axios'
import { axiosRequest } from '@/utils/axios';
let api = "http://localhost:2000/data"

export const useProducts = create((set,get) => ({ 
    data: [],
    getProducts: async() =>{
      try {
        let { data } = await axiosRequest.get(`/Product/get-products`);
        set({data:data.data.products});
        console.log({data:data.data.products},"ass");
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    minMax: {},
    getMinMax: async () => {
        try {
          let {data} = await axiosRequest(`/Product/get-products`);
          set({minMax: data.data.minMaxPrice})
        } catch (error) {
          console.error(error);
        }
    },
    el: {},
    getProductById: async (id) => {
        try {
          let {data} = await axiosRequest(`/Product/get-product-by-id?id=${id}`);
          set({el : data.data})
        } catch (error) {
          console.error(error);
        }
    },
    getProductByPrice: async (min, max) => {
      try {
        let {data} = await axiosRequest(`/Product/get-products?MinPrice=${min}&MaxPrice=${max}`);
        set({data: data.data.products});
      } catch (error) {
        console.error(error);
      }
    },
}))
