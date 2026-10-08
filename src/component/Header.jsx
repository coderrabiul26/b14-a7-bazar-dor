import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";


const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
   <div>
         <div className="flex justify-between container mx-auto py-4">
      <div className="flex items-center gap-3">
        <Image
          src={"/logo-icon.png"}
          width={45}
          height={45}
          alt="header-logo"
          className="bg-green-500 rounded-lg p-3"
        ></Image>
        <div>
          <h1 className="text-2xl font-bold">বাজার দর</h1>
          {date}
        </div>
      </div>
      <div className="flex items-center">
            <button className="btn btn-outline border-none mr-3 p-3">
              সাইন ইন
            </button>
            <button className="btn btn-error bg-red-700 text-white py-1 px-3 rounded-md">
              সাইন আপ
            </button>
          </div>
    </div>
    <Navlinks></Navlinks>
   </div>
  );
};

export default Header;
