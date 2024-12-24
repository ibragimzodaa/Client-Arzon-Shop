"use client"

import { useStore } from '@/store/useStore';
import Link from 'next/link';
import React, { useEffect } from 'react'

const Categoyr = () => {
  let {data, getData} = useStore();
  useEffect(() => {
    getData();
  }, [])
  return <>
     <div className="max-w-full mx-auto px-4 relative z-[-40]">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium mt-4 mb-6 text-center">Каталог товаров</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {data.map((el) => (
      <Link
        href={`/category/${el.id}`}
        key={el.id}
        className="flex flex-col items-center justify-center w-full h-[140px] border-2 b rounded-xl p-6 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
      >
        <h1 className="text-center text-lg font-semibold text-gray-800">{el.categoryName}</h1>
      </Link>
    ))}
  </div>
</div>

  </>
}

export default Categoyr
