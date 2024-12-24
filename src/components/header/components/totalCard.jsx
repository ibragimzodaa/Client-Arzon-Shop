import { primary } from "@/components/theme/theme";
import { useCard } from "@/store/getCard";
import React, { useEffect } from "react";

export default function TotalCard() {
  let { data, getCard } = useCard();
  useEffect(() => {
    getCard();
  },[]);
  return (
    <>
      {data.map((el, index) => (
        <div key={index}>
          <span
            className="absolute bottom-8 left-8 text-white text-[15px] font-semibold p px-2 rounded-full shadow-md"
            style={{ backgroundColor: primary }}
          >
            {el.totalProducts}
          </span>
        </div>
      ))}
    </>
  );
}
