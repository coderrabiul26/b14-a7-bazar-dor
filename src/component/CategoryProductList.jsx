
"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";

const CategoryProductList = ({ products }) => {
  const [sortType, setSortType] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "low") {
      return a.today - b.today;
    }

    if (sortType === "high") {
      return b.today - a.today;
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

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <span className="text-gray-400 block mt-3">
        {`মোট ${toBengaliNumber(products.length)} টি পণ্য দেখানো হচ্ছে`}
      </span>

      <div className="grid grid-cols-4 gap-3 mt-2">
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
