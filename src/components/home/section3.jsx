// 'use client'
import { primary } from "@/components/theme/theme";
import { Button } from "@/components/ui/button";
import { useCard } from "@/store/getCard";
import { useProducts } from "@/store/getProducts";
import { ShoppingCartIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montsserat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});
let token=null
if (typeof window !== 'undefined') {
  token = localStorage.getItem("access_token");
}

export default function Section3() {
  let { data, getProducts } = useProducts();
  let { dataCard, postCard, status, setStatus, cnt, setCnt } = useCard();
  let navigate = useRouter();

  useEffect(() => {
    getProducts();
  }, [status]);

  const handleAddToCart = () => {
    toast.dismiss(); // Dismiss existing toasts
    toast.success(
      <div>
        Товар добавлен в корзину!{" "}
        <Link
          href="/card"
          style={{ color: primary, textDecoration: "underline" }}
        >
          Перейти в корзину
        </Link>
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        onClose: () => console.log("Тост завершен!"),
      }
    );
  };

  return (
    <section>
      <h1 className="text-[30px] font-semibold mt-[50px] mb-[30px]">
        Наши продукты
      </h1>
      <div className="flex justify-between flex-wrap gap-[20px]">
        {data.map((el) => {
          return (
            <div key={el.id} className="w-[200px]">
              <Link href={`/product/${el.id}`}>
              <Image
                width={100}
                height={100}
                src={`https://store-api.softclub.tj/images/${el.image}`}
                alt=""
                className="w-[200px] h-[200px]"
                />
              <p
                className={`${montsserat.className} text-[20px] font-semibold`}
                >
                {el.price + " c"}
              </p>
              <p className={`${montsserat.className} text-[15px]`}>
                14 c. *24мес
              </p>
              <p className={`${montsserat.className}`}>{el.productName}</p>
              </Link>
              {token ? (
                el.productInfoFromCart != null ? (
                  <Button
                    style={{
                      backgroundColor: primary,
                      marginTop: "10px",
                    }}
                  >
                    Уже в корзине
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      postCard(el.id);
                      setStatus();
                      getProducts();
                      handleAddToCart();
                      setCnt(cnt + 1);
                    }}
                    style={{
                      backgroundColor: primary,
                      marginTop: "10px",
                    }}
                  >
                    <ShoppingCartIcon /> В корзину
                  </Button>
                )
              ) : (
                <Button
                  onClick={() => {
                    navigate.push("/register");
                  }}
                  style={{
                    backgroundColor: primary,
                    marginTop: "10px",
                  }}
                >
                  <ShoppingCartIcon /> В корзину
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </section>
  );
}
