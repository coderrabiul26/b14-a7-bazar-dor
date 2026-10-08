
"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";

const SortControl = ({ products }) => {
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

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">সাজান:</span>

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

      <div className="grid grid-cols-4 gap-3 mt-4">
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

export default SortControl;
