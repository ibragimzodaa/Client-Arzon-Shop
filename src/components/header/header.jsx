"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Home, LogIn, Percent, ShoppingCart, User } from "lucide-react";
import { Kanit } from "next/font/google";
import axios from "axios";
import { useBrands } from "@/store/getCategory";
import { CircleOff, MapPin, Search, UserPen } from "lucide-react";
import { Input } from "../ui/input";
import { primary } from "../theme/theme";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCard } from "@/store/getCard";
import TotalCard from "./components/totalCard";
import { useRouter } from "next/navigation";
let access_token=null
if (typeof window !== "undefined") {
   access_token = localStorage.getItem("access_token");
}
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Header = () => {
  let path = usePathname();
  let { getBrands, data } = useBrands();
  const [accessToken, setAccessToken] = useState(null);
  let router = useRouter();

  useEffect(() => {
    getBrands();
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("access_token") != "") {
        setAccessToken(localStorage.getItem("access_token"));
      }
    }
  }, []);
  if (path == "/login" || path == "/register") {
    return "";
  }
  return (
    <header>
      <div className="flex items-center container justify-between pb-[100px] xs:flex-wrap">
        <div className="flex justify-between xs:w-[93%] items-center xd:w-[150px]">
          <Link href="/">
            <h1
              className={`${kanit.className} text-[30px] w-[200px] select-none cursor-pointer`}
            >
              arzon shop
            </h1>
          </Link>
          <div className=" w-[10px] text-center cursor-pointer xd:hidden xs:block">
            <MapPin className="ml-[20px] xl:w-[20px]" />
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="xl:ml-[-40px] 1xl:ml-[0] xs:hidden xd:flex"
                style={{
                  backgroundColor: primary,
                  padding: "25px",
                  // color: "black",
                }}
              >
                {" "}
                <span className="">☰</span> Каталог товаров
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Array.isArray(data) &&
                data.map((el, index) => (
                  <DropdownMenuSub key={index * 5}>
                    <div onClick={() => router.push(`/category/${el.id}`)}>
                      <DropdownMenuSubTrigger className="hover:text-[#6A00F4]">
                        {el.categoryName}
                      </DropdownMenuSubTrigger>
                    </div>
                    {Array.isArray(el.subCategories) ? (
                      el.subCategories.length > 0 ? (
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {el.subCategories.map((sub, subIndex) => (
                              <DropdownMenuItem
                                key={subIndex * 9}
                                className="hover:text-[#6A00F4]"
                              >
                                <p
                                  onClick={() =>
                                    router.push(`/category/${el.id}/${sub.id}`)
                                  }
                                  className="hover:text-[#6A00F4]"
                                >
                                  {sub.subCategoryName}
                                </p>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      ) : (
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem className="text-[red]">
                              {" "}
                              <CircleOff />
                              Ничего нет
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      )
                    ) : null}
                  </DropdownMenuSub>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2 xl:ml-[-50px] 1xl:ml-[0] xs:mt-[20px] xd:mt-[0px]">
          <Input
            className="outline-none p-[25px] xd:w-[450px] xs:w-[290px] "
            type="search"
            placeholder="название товара или артикул"
          />
          <Button
            type="submit"
            style={{
              backgroundColor: primary,
              padding: "25px",
              // color: "white",
            }}
          >
            <Search />
          </Button>
        </div>
        {accessToken ? (
          <div className="flex items-center w-[200px] justify-between xl:w-[250px] xl:pr-[50px] xs:hidden xd:flex">
            <div className=" w-[10px] text-center cursor-pointer">
              <MapPin className="ml-[20px] xl:w-[20px]" />
              <p className="font-semibold text-[gray] text-[15px]">Душанбе</p>
            </div>
            <div className=" w-[10px] text-center cursor-pointer">
              <UserPen className="ml-[20px] xl:w-[20px]" />
              <p className="font-semibold text-[gray] text-[15px]">Профиль</p>
            </div>
            <Link href="/card">
              {" "}
              <div className=" w-[10px] text-center cursor-pointer">
                <ShoppingCart className="ml-[20px] xl:w-[20px]" />
                <div className="flex relative">
                  <p className="font-semibold text-[gray] text-[15px] relative">
                    Корзина
                  </p>
                  <TotalCard />
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className=" text-center ml-[105px] xs:hidden xd:flex">
            <Link href="/register">
              <Button
                style={{
                  backgroundColor: primary,
                  padding: "25px",
                  // color: "black",
                }}
              >
                Войти
              </Button>
            </Link>
          </div>
        )}
      </div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 xd:hidden">
        <div className="flex justify-around items-center h-16">
          <Link href="/">
            <Button className="bg-[white] shadow-none flex flex-col items-center">
              <Home className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-gray-600">Главная</span>
            </Button>
          </Link>
          <Link href="/category">
            <Button className="bg-[white] shadow-none flex flex-col items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-gray-500 fill-gray-500"
              >
                <path
                  strokeWidth="0"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 9C10 6.23858 12.2386 4 15 4C17.7614 4 20 6.23858 20 9C20 11.7614 17.7614 14 15 14C12.2386 14 10 11.7614 10 9ZM15 2C11.134 2 8 5.13401 8 9C8 12.866 11.134 16 15 16C15.8749 16 16.7122 15.8395 17.4843 15.5464L20.1182 20.4716C20.3786 20.9586 20.9846 21.1423 21.4716 20.8818C21.9586 20.6214 22.1423 20.0154 21.8818 19.5284L19.2331 14.5755C20.9145 13.2969 22 11.2752 22 9C22 5.13401 18.866 2 15 2Z"
                ></path>
                <path d="M3 12H5" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M3 16H7" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M3 20H13" strokeWidth="2" strokeLinecap="round"></path>
              </svg>{" "}
              <span className="text-xs text-gray-600">Каталог</span>
            </Button>
          </Link>
          <Link href="/card">
            <Button className="bg-[white] shadow-none flex flex-col items-center">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <div className="relative">
                <TotalCard />
                <span className="text-xs text-gray-600 relative">Корзина</span>
              </div>
            </Button>
          </Link>
          {access_token ? (
            <Link href="/profile">
              <Button className="bg-[white] shadow-none flex flex-col items-center">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-xs text-gray-600">Профиль</span>
              </Button>
            </Link>
          ) : (
            <Link href="/register">
              <Button className="bg-[white] shadow-none flex flex-col items-center">
                <LogIn className="h-5 w-5 text-gray-600" />
                <span className="text-xs text-gray-600">Войти</span>
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
