"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBrands } from "@/store/getCategory";
import { useLoginRegister } from "@/store/login";
import React, { useEffect, useState } from "react";
import Section1 from "@/components/home/section1";
import Section2 from "@/components/home/section2";
import Section3 from "@/components/home/section3";

const Home = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("access_token");
    }
  }, []);
  return <>
        <div className='container'>
        <Section1/>
        <Section2/>
        <Section3/>
        </div>
  </>;
};

export default Home;
