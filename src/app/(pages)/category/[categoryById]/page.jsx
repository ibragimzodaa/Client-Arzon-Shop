"use client";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { primary } from "@/components/theme/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBrands } from "@/store/getBrands";
import { useCard } from "@/store/getCard";
import { useProducts } from "@/store/getProducts";
import { useStore } from "@/store/useStore";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

let fileAPI = "https://store-api.softclub.tj" + "/images/";

const ById = () => {
  let { categoryById } = useParams();
  let { products, getProd, category, getCatId, getProductByPrice, getByBrand } = useStore();
  let { getBrands, data } = useBrands();
  let { postCard } = useCard();
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [checkedBrands, setCheckedBrands] = useState({});

  useEffect(() => {
    if (!categoryById) return;
    getProd("CategoryId", categoryById);
    getCatId(categoryById);
    getBrands();
  }, [getCatId, getBrands]);

  const handleFilter = (e) => {
    e.preventDefault();
    const minValue = parseFloat(min);
    const maxValue = parseFloat(max);

    if (isNaN(minValue) || isNaN(maxValue)) return;

    if (minValue <= maxValue) {
      getProductByPrice(minValue, maxValue);
    } else {
      setMax(minValue);
    }
  };

  const handleBrandChange = (brandId) => {
    setCheckedBrands((prev) => {
      const updatedBrands = { ...prev, [brandId]: !prev[brandId] };
        if (updatedBrands[brandId]) {
        getByBrand(brandId);
      } else {
        getProd("CategoryId", categoryById);
      }
  
      return updatedBrands;
    });
  };

  const bItems = [
    { label: "Каталог товаров", href: "/" },
    { label: category?.categoryName || "Loading..." },
  ];

  return (
    <div className="container">
      <Breadcrumb items={bItems} />
      <div className="flex flex-wrap gap-3 mt-[30px]">
        {category && category.subCategories?.map((el) => (
          <Link href={`/category/${categoryById}/${el.id}`} key={el.id}>
            <div className="bg-gray-100 text-black px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-200 transition-transform transform hover:-translate-y-1">
              <h1 className="text-sm font-medium whitespace-nowrap">{el.subCategoryName}</h1>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex">
        <div className="p-4">
          <form className="w-full flex justify-between mt-[10px]" onSubmit={handleFilter}>
            <input
              type="number"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-[45%] border px-[7px] rounded-lg py-[10px]"
              placeholder="От 1"
            />
            <input
              type="number"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-[50%] border px-[7px] rounded-lg py-[10px]"
              placeholder="Дo 1435"
            />
            <button type="submit" className="hidden"></button>
          </form>

          <div className="mt-4">
            <div className="space-y-2">
              {data.map((el) => (
                <div key={el.id * 1921} className="flex items-center space-x-3 mt-[20px]">
                  <Input
                    id={el.brandName}
                    type="checkbox"
                    checked={checkedBrands[el.id] || false}
                    onChange={() => handleBrandChange(el.id)}
                    className="w-[20px] h-[20px] border border-gray-300 rounded-sm cursor-pointer mt-[10px]"
                  />
                  <label htmlFor={el.brandName} className="text-sm font-medium text-gray-800 mt-[10px]">
                    {el.brandName}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1180px] mx-auto mt-[60px] flex justify-between flex-wrap items-center">
          {products && products.length > 0 ? (
            products.map((el) => (
              <div key={el.id} className="group flex flex-col mt-[15px] items-start p-4 rounded-lg bg-white w-64">
                <Link href={`/productById/${el.id}`}></Link>
                <Image
                  width={400}
                  height={400}
                  src={fileAPI + el.image}
                  alt={el.productName}
                  layout="responsive"
                  className="w-full h-48 object-cover mb-3"
                />
                <div className="flex items-center mb-2">
                  {el.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs rounded mr-2">
                      -{el.discount}%
                    </span>
                  )}
                  <span className="font-bold text-lg text-gray-900 mr-2">{el.price} c.</span>
                  {el.oldPrice && <span className="line-through text-gray-500 text-sm">{el.oldPrice} c.</span>}
                </div>
                <h1 className="font-medium mb-3 group-hover:text-[#b98fe6]">{el.productName}</h1>
                {el.productInfoFromCart != null ? (
                  <Button style={{ backgroundColor: primary, color: "white", marginTop: "10px" }}>Уже в корзине</Button>
                ) : (
                  <Button
                    onClick={() => postCard(el.id)}
                    style={{ backgroundColor: primary, color: "white", marginTop: "10px" }}
                  >
                    <ShoppingCartIcon /> В корзину
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ById;
