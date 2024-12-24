"use client";
import { Kanit } from "next/font/google";
import { usePathname } from "next/navigation";
import React from "react";
import { primary } from "../theme/theme";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
  let path = usePathname();
  if (path === "/login" || path === "/register") {
    return null;
  }

  return (
    <footer className="bg-black text-white py-10 mt-[50px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About Section */}
        <div>
          <h1 className={`${kanit.className} text-[35px]`} style={{color: primary}}>
            Arzon shop
          </h1>
          <ul className="space-y-2 mt-4">
            <li>О нас</li>
            <li>Вакансии</li>
            <li>Новости Arzon Shop</li>
          </ul>
        </div>

        {/* Links for Customers and Partners */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Для покупателей</h2>
          <ul className="space-y-2">
            <li>Рассрочка</li>
            <li>Реквизиты</li>
            <li>Чат поддержки</li>
          </ul>
        </div>
        <div>
        <h2 className="text-lg font-semibold mt-6 mb-4">Для партнеров</h2>
          <ul className="space-y-2">
            <li>Продавать на Arzon Shop</li>
            <li>Личный кабинет продавца</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>
          © 2024 ОАО «Алиф Банк». г. Душанбе, 101 мкр-н, ул. Багаутдинова, 9
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white">
            Instagram
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Facebook
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
