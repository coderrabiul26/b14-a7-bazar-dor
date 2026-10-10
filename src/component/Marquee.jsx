import React from "react";
import baseUrl from "./Baseurl";
import MarqueeText from "react-marquee-text";

const Marquee = async () => {
  const res = await fetch(`${baseUrl}/api/bazardor/products`);
  const products = await res.json();

  const toBengaliNumber = (number) => {
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    return String(number).replace(/\d/g, (digit) => {
      return bengaliDigits[digit];
    });
  };
  return (
    <div className="my-4 border-2 border-gray-200 py-2">
     <MarqueeText direction="right" duration={10} flex items-center>
         <div className="overflow-hidden whitespace-nowrap">
        <div className="flex w-max gap-10 animate-marquee">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <span>{product.categoryIcon}</span>

              <span>{product.nameBn}</span>

              <span>৳{toBengaliNumber(product.today)}/{product.unit}</span>

              {product.change.dir === "up" ? (
                <span className="flex items-center gap-1 text-red-500">
                  <span>↑</span>
                  <span>{toBengaliNumber(product.change.pct)}%</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-green-500">
                  <span>↓</span>
                  <span>{toBengaliNumber(product.change.pct)}%</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
     </MarqueeText>
    </div>
  );
};

export default Marquee;
