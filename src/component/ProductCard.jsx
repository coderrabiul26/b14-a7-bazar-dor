import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  const toBengaliNumber = (number) => {
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    return String(number).replace(/\d/g, (digit) => {
      return bengaliDigits[digit];
    });
  };

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  

  return (
    <Link href={`/detail/${product.id}`}>
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Product Info */}
      <div className="flex items-center gap-3">
        <div className="text-5xl">{product.image}</div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">{product.nameBn}</h2>

          <p className="mt-1 text-lg text-gray-500">per {product.unit}</p>
        </div>
      </div>

      {/* Today's Price */}
      <div className="mt-6">
        <p className="text-base text-gray-500">আজকের দাম</p>

        <div className="mt-1 flex items-end justify-between">
          {/* Price */}
          <p className="text-3xl font-bold text-gray-900">৳ {toBengaliNumber(product.today)}</p>

          {/* Percentage Change */}
          <div
            className={`flex items-center gap-1 text-lg font-bold bg-gray-100 rounded-full py-1 px-2 ${
              isUp ? "text-red-500" :isDown? "text-green-500":''
            }`}
          >
            <span className="text-2xl">{isUp ? "↑" :isDown? "↓":'-'}</span>

            <span>{product.change.pct}%</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;