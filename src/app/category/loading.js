import CategoryPageSkeleton from "@/component/categoryPageLoading";
import React from "react";

const LoadingCategoryPage = () => {
  return (
   <div className="grid grid-cols-4 gap-3 mt-2">
        {Array.from({length: 5}).map((_, ind)=><CategoryPageSkeleton key={ind}></CategoryPageSkeleton>)}
   </div>
  );
};

export default LoadingCategoryPage;
