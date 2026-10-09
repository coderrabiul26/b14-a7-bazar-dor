
import baseUrl from "@/component/Baseurl";
import CategoryProductList from "@/component/CategoryProductList";
import Link from "next/link";
import React from "react";

const CategoryPage = async ({ params }) => {
  const { categoryslug } = await params;

  const res = await fetch(
    `${baseUrl}/api/bazardor/products?category=${categoryslug}`,
  );
  const categoryProducts = await res.json();

  const response = await fetch(`${baseUrl}/api/bazardor/categories`);
  const categories = await response.json();

  const currentCategory = categories.find(
    (category) => category.slug === categoryslug,
  );

  // console.log(currentCategory);

  const toBengaliNumber = (number) => {
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    return String(number).replace(/\d/g, (digit) => {
      return bengaliDigits[digit];
    });
  };

  if (!currentCategory || categoryProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">😕</div>

        <h1 className="text-3xl font-bold mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h1>

        <p className="text-gray-500 mb-5">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>

        <Link
          href="/"
          className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="border border-gray-200 p-2 flex items-center gap-2 rounded-lg">
        <span className="text-5xl">{currentCategory.icon}</span>

        <div>
          <span className="text-3xl font-bold">
            {currentCategory.nameBn}
          </span>

          <p className="text-gray-400">
            {`${toBengaliNumber(categoryProducts.length)} টি পণ্যের আজকের দাম ও পরিবর্তন`}
          </p>
        </div>
      </div>

      <CategoryProductList products={categoryProducts} />

      {/* <span className="text-gray-400">
        {`মোট ${toBengaliNumber(categoryProducts.length)} টি পণ্য দেখানো হচ্ছে`}
      </span> */}
    </div>
  );
};

export default CategoryPage;

