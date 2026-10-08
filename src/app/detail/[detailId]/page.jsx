
import baseUrl from "@/component/Baseurl";
import Link from "next/link";
import React from "react";

const toBengaliNumber = (number) => {
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    return String(number).replace(/\d/g, (digit) => {
        return bengaliDigits[digit];
    });
};

const DetailPage = async ({ params }) => {
    const { detailId } = await params;

    const res = await fetch(
        `${baseUrl}/api/bazardor/products/${detailId}`
    );

    const product = await res.json();

    const isUp = product.change.dir === "up";

    // Lowest market price
    const lowestPrice = Math.min(
        ...product.markets.map((market) => market.min)
    );

    // Highest market price
    const highestPrice = Math.max(
        ...product.markets.map((market) => market.max)
    );

    // Average market price
    const averagePrice =
        product.markets.reduce(
            (total, market) =>
                total + (market.min + market.max) / 2,
            0
        ) / product.markets.length;

    const roundedAveragePrice = Math.round(averagePrice);

    // Difference between today and yesterday
    const priceDifference = Math.abs(
        product.today - product.yesterday
    );

    return (
        <div className="min-h-screen px-3 py-3 text-gray-800">

            {/* Breadcrumb */}
            <div className="mx-auto mb-5 max-w-7xl text-xs text-gray-600">
                <Link href="/">
                    <span>হোম</span>
                </Link>

                <span className="mx-2">›</span>

                {product.categoryNameBn}

                <span className="mx-2">›</span>

                <span className="text-gray-800">
                    {product.nameBn}
                </span>
            </div>

            <div className="mx-auto max-w-7xl">

                {/* Product Header */}
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm">

                    {/* Left Side */}
                    <div className="flex items-center gap-3">

                        {/* Product Icon */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f1] text-3xl">
                            {product.image}
                        </div>

                        {/* Product Information */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-xs text-gray-500">
                                {product.description ||
                                    `${product.categoryNameBn} বাজারের বর্তমান মূল্য`}
                            </p>

                            {/* Category Tags */}
                            <div className="mt-2 flex items-center gap-2">
                                <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                                    {product.categoryNameBn}
                                </span>

                                <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600">
                                    প্রতি {product.unit}
                                </span>
                            </div>

                            <p className="mt-2 text-xs text-gray-700">
                                গতকালের তুলনায় আজ দাম{" "}

                                {priceDifference === 0
                                    ? "অপরিবর্তিত"
                                    : isUp
                                    ? "বেড়েছে"
                                    : "কমেছে"}

                                {priceDifference > 0 && (
                                    <>
                                        {" - "}
                                        {toBengaliNumber(priceDifference)}{" "}
                                        টাকা
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Today's Price */}
                    <div className="rounded-xl bg-[#f0f5f0] px-5 py-3 text-center">

                        <p className="text-[10px] text-gray-500">
                            আজকের দাম
                        </p>

                        <p className="text-2xl font-bold text-gray-800">
                            {toBengaliNumber(product.today)}
                        </p>

                        <p className="text-[10px] text-gray-500">
                            টাকা / {product.unit}
                        </p>

                        <p
                            className={`mt-1 text-[10px] font-semibold ${
                                isUp
                                    ? "text-red-500"
                                    : "text-green-600"
                            }`}
                        >
                            {isUp ? "▲" : "▼"}{" "}
                            {toBengaliNumber(product.change.pct)}%
                        </p>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="mt-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">

                    <h2 className="mb-3 text-sm font-bold">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                        {/* Lowest */}
                        <div className="rounded-xl border border-gray-200 p-3">
                            <p className="text-[10px] text-gray-500">
                                সর্বনিম্ন দাম
                            </p>

                            <p className="mt-1 text-xl font-bold text-green-600">
                                {toBengaliNumber(lowestPrice)}
                                <span className="ml-1 text-xs font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-[10px] text-gray-500">
                                সর্বনিম্ন বাজার দর
                            </p>
                        </div>

                        {/* Highest */}
                        <div className="rounded-xl border border-gray-200 p-3">
                            <p className="text-[10px] text-gray-500">
                                সর্বাধিক দাম
                            </p>

                            <p className="mt-1 text-xl font-bold text-red-500">
                                {toBengaliNumber(highestPrice)}
                                <span className="ml-1 text-xs font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-[10px] text-gray-500">
                                সর্বাধিক বাজার দর
                            </p>
                        </div>

                        {/* Average */}
                        <div className="rounded-xl border border-gray-200 p-3">
                            <p className="text-[10px] text-gray-500">
                                গড় দাম
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-800">
                                {toBengaliNumber(roundedAveragePrice)}
                                <span className="ml-1 text-xs font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-[10px] text-gray-500">
                                প্রতি {product.unit} এর গড় মূল্য
                            </p>
                        </div>
                    </div>

                    {/* Market Prices */}
                    <h2 className="mb-3 mt-5 text-sm font-bold">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto rounded-xl border border-gray-200">

                        <table className="w-full min-w-162.5 border-collapse text-xs">

                            <thead>
                                <tr className="bg-white text-gray-500">

                                    <th className="px-3 py-3 text-left font-medium">
                                        বাজার
                                    </th>

                                    <th className="px-3 py-3 text-left font-medium">
                                        বিভাগ
                                    </th>

                                    <th className="px-3 py-3 text-right font-medium">
                                        সর্বনিম্ন
                                    </th>

                                    <th className="px-3 py-3 text-right font-medium">
                                        সর্বাধিক
                                    </th>

                                    <th className="px-3 py-3 text-right font-medium">
                                        গড়
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {product.markets.map((market, index) => {

                                    const marketAverage = Math.round(
                                        (market.min + market.max) / 2
                                    );

                                    return (
                                        <tr
                                            key={index}
                                            className={`border-t border-gray-300 ${
                                                index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-50"
                                            }`}
                                        >

                                            <td className="px-3 py-2.5">
                                                {market.market}
                                            </td>

                                            <td className="px-3 py-2.5">
                                                {market.division}
                                            </td>

                                            <td className="px-3 py-2.5 text-right">
                                                {toBengaliNumber(market.min)}{" "}
                                                টাকা
                                            </td>

                                            <td className="px-3 py-2.5 text-right">
                                                {toBengaliNumber(market.max)}{" "}
                                                টাকা
                                            </td>

                                            <td className="px-3 py-2.5 text-right font-semibold">
                                                {toBengaliNumber(marketAverage)}{" "}
                                                টাকা
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;

