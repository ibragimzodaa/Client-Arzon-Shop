"use client";
import { primary } from "@/components/theme/theme";
import { useCard } from "@/store/getCard";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Card() {
  const { getCard, data, deleteCard, incresNum, decresNum } = useCard();
  const [paymentMethod, setPaymentMethod] = useState("installments");
  let [cnt, setCnt] = useState(1);

  useEffect(() => {
    getCard();
  },[]);

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Корзина{" "}
        {data.map((el,index) => (
          <span key={index * 34} className="text-gray-500 text-lg">
            ({el.totalProducts}) товары
          </span>
        ))}
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4 h-[300px]">
          {data.map((el,index) => (
            <div
              key={index * 86}
              className="bg-gray-50 p-4 rounded-md shadow-md h-[380px] overflow-auto gap-[40px]"
            >
              {el.productsInCart.map((product,index) => (
                <div
                  key={index*100}
                  className="flex gap-4 items-center mb-[30px]"
                >                  <Image
                    width={100}
                    height={100}
                    src={`https://store-api.softclub.tj/images/${product.product.image}`}
                    alt={product.product.productName}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">
                      {product.product.productName}
                    </h2>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="text-gray-500 line-through text-sm">
                        {product.product.oldPrice} с.
                      </span>
                      <span className="text-red-500 bg-red-100 text-sm px-2 rounded-full">
                        -{product.product.discount}%
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="font-semibold text-xl">
                        {product.product.price} с.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decresNum(product.id)}
                      className={`border rounded-md px-4 py-1 text-lg ${
                        product.quantity === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-white"
                      }`}
                      disabled={product.quantity === 1}
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => incresNum(product.id)}
                      className="border rounded-md px-4 py-1 text-lg bg-white"
                    >
                      +
                    </button>
                    <button className="text-gray-500 hover:text-red-500">
                      <Trash onClick={() => deleteCard(product.id)} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full lg:w-[350px] bg-white shadow-md rounded-md p-6">
          <h2 className="text-gray-600 text-sm mb-4">Способ оплаты</h2>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setPaymentMethod("installments")}
              className={`flex-1 py-2 border rounded-md text-center text-sm ${
                paymentMethod === "installments"
                  ? "border-yellow-400 text-black font-semibold"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              В рассрочку
            </button>
            <button
              onClick={() => setPaymentMethod("cash")}
              className={`flex-1 py-2 border rounded-md text-center text-sm ${
                paymentMethod === "cash"
                  ? "border-yellow-400 text-black font-semibold"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Наличными
            </button>
          </div>
          {data.map((el) => (
            <div key={el.id} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between text-sm mb-2">
                <span>Товары ({el.totalProducts})</span>
                <span className="font-medium">{el.totalPrice} с.</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Скидка</span>
                <span className="">0 с.</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Общая сумма доставки</span>
                <span>0 с.</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Комиссия за товары ({el.totalProducts})</span>
                <span>{el.totalProducts * el.totalProducts} с.</span>
              </div>
              <hr className="my-2 border-t border-gray-300" />
              <div className="flex justify-between font-bold text-lg">
                <span>Итого</span>
                <span>{el.totalPrice} с.</span>
              </div>
            </div>
          ))}
          <button
            className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-md mt-4 hover:bg-yellow-500"
            style={{ backgroundColor: primary }}
          >
            Перейти к оформлению
          </button>
        </div>
      </div>
    </section>
  );
}
