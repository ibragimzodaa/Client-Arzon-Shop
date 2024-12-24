"use client";
import { useBrands } from "@/store/getBrands";
import Image from "next/image";
import React, { useEffect } from "react";
import apple from './images/apple.svg'
import samsung from './images/samsung.svg'
import huawei from './images/huawei.svg'
import gucci from './images/gussi.svg'
import nike from './images/nike.svg'
import puma from './images/Puma-Logo-Symbol.png'

export default function Section2() {
  let { data, getBrands } = useBrands();
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <section>
      <h1 className="text-[30px] font-semibold mt-[50px] mb-[30px]">Наши бренди</h1>

    <div className="flex justify-between flex-wrap xs:gap-[20px] md:gap-0">
      {data.map((el, i) => {
        if (el.id == 1) {
          return (
            <div key={i} className="bg-[#D9D9D9] rounded-[50%] w-[130px] h-[130px] p-[30px] cursor-pointer">
              {/* <h1>{el.brandName}</h1> */}
              <Image src={apple} alt=""/>
            </div>
          );
        }
        else if (el.id == 2) {
          return (
            <div key={i} className="bg-[#D9D9D9] rounded-[50%] w-[130px] h-[130px] p-[30px] cursor-pointer">
              {/* <h1>{el.brandName}</h1> */}
              <Image src={samsung} alt=""/>
            </div>
          );
        }
        else if (el.id == 3) {
          return (
            <div key={i} className="bg-[#D9D9D9] rounded-[50%] w-[130px] h-[130px] p-[30px] cursor-pointer">
              {/* <h1>{el.brandName}</h1> */}
              <Image src={huawei} alt=""/>
            </div>
          );
        }
        else if (el.id == 4) {
          return (
            <div key={i} className="bg-[#D9D9D9] rounded-[50%] w-[130px] h-[130px] p-[30px] cursor-pointer">
              {/* <h1>{el.brandName}</h1> */}
              <Image src={gucci} alt=""/>
            </div>
          );
        }
        else if (el.id == 5 ) {
          return (
            <div key={i} className="bg-[#D9D9D9] rounded-[50%] w-[130px] h-[130px] p-[30px] cursor-pointer">
              {/* <h1>{el.brandName}</h1> */}
              <Image src={nike} alt=""/>
            </div>
          );
        }
        else if (el.id == 6 ) {
          return (
            <div key={i} className="bg-[#D9D9D9] rounded-[50%] w-[130px] h-[130px] p-[30px] cursor-pointer">
              {/* <h1>{el.brandName}</h1> */}
              <Image src={puma} alt=""/>
            </div>
          );
        }
      })}
    </div>
      </section>
  );
}
