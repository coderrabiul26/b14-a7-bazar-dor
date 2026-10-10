"use client";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";


const ProfilePage = () => {

  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  return (
    <div className="flex flex-col max-w-150 h-screen mx-auto mt-25">
        <div className="bg-[#c2ecee] rounded-lg p-3 mb-3">
            <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
            <h1 className="text-gray-400">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন</h1>
        </div>
        <div className="bg-[#c2ecee] rounded-lg p-3 text-xl">
            <h1>Name: <span className="text-2xl font-bold text-blue-800 ml-3">{user?.name}</span></h1>
            <h1>Email address: <span className="text-2xl font-bold text-blue-800 ml-3">{user?.email}</span></h1>
            <h1>ID no: <span className="text-2xl font-bold text-blue-800 ml-3">{user?.id}</span></h1>
        </div>
        
        <Link href={'/profile-update'} >
            <Button className='bg-green-500 mt-3 w-full'>প্রোফাইল আপেডট করুন</Button>
        </Link>
        
       
    </div>
      
   
    
  );
};

export default ProfilePage;
