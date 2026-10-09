"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import toast from "react-hot-toast";

const Userinfo = () => {
  const { data: session } = useSession();
  const user = session?.user;

    const handleSignOut=async()=>{
        await signOut()
        toast.error('Signed out successfully')
    }
  

  return (
    <div>
      {user ? (
        <div className="flex gap-4 items-center">
          <h1>Welcome! <span className="text-black-500 font-bold text-2xl">{user.name}</span></h1>
          <Button onClick={handleSignOut} className='bg-red-500'>সাইন আউট</Button>
        </div>
      ) : (
        <div>
          <div >
            <Link href={'/signin'}><button className="btn btn-outline border-none mr-3">
              সাইন ইন
            </button></Link>
            <Link href={'/signup'}><button className="btn btn-error bg-green-500 text-white py-1 px-3 rounded-full">
              সাইন আপ
            </button></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userinfo;
