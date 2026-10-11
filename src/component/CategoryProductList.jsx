"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";

const CategoryProductList = ({ products }) => {
  const [sortType, setSortType] = useState("default");

  // Safe check if products is an array
  const safeProducts = Array.isArray(products) ? products : [];

  const toNumber = (value) => {
    const englishDigits = "0123456789";
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    return Number(
      String(value).replace(/[০-৯]/g, (digit) => {
        return englishDigits[bengaliDigits.indexOf(digit)];
      })
    );
  };

  const sortedProducts = [...safeProducts].sort((a, b) => {
    if (sortType === "low") {
      return toNumber(a.today) - toNumber(b.today);
    }

    if (sortType === "high") {
      return toNumber(b.today) - toNumber(a.today);
    }

    return 0;
  });

  const toBengaliNumber = (number) => {
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    return String(number).replace(/\d/g, (digit) => {
      return bengaliDigits[digit];
    });
  };

  return (
    <div>
      <div className="border border-gray-200 rounded-lg p-2">
        <label className="font-semibold mr-2">
          সাজান:
        </label>

        <div className="relative inline-block">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 outline-none bg-white"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </span>
        </div>
      </div>

      <span className="text-gray-400 block mt-3 px-2 sm:px-0">
        {`মোট ${toBengaliNumber(safeProducts.length)} টি পণ্য দেখানো হচ্ছে`}
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 px-2 sm:px-0">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductList;