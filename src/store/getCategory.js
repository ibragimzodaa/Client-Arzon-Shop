 import {create} from 'zustand'
import axios from 'axios'
import { axiosRequest } from '@/utils/axios';
let api = "http://localhost:2000/data"

export const useBrands = create((set,get) => ({ 
    data: [],
    getBrands: async() =>{
      try {
        let { data } = await axiosRequest.get(`/Category/get-categories`);
        set({data:data.data});
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
}))
