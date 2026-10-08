import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });


    return (
        <div className='grid grid-cols-2 border border-gray-200 rounded-lg py-4 px-2'>
            <div className='flex-1'>
                <span className='text-green-500 bg-gray-100 font-bold py-1 px-2 rounded-lg'>{date}</span>
                <h1 className='text-3xl font-bold mb-10 mt-3'>আজকের বাজারের দাম এক নজরে</h1>
                <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <Link href='#allProduct'>
                    <Button className='bg-green-500 rounded-lg text-white py-1 px-3 mt-10'>সব পণ্য দেখুন</Button>
                </Link>
            </div>
            <div className='justify-self-end'>
                <Image src={'/bazar-hero.png'} width={400} height={400} alt='hero-image'></Image>
            </div>
            
        </div>
    );
};

export default Banner;