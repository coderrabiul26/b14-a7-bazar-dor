import React from 'react';
import baseUrl from './Baseurl';
import { Button } from '@heroui/react';
import Link from 'next/link';


const Navlinks = async() => {
    const res=await fetch(`${baseUrl}/api/bazardor/categories`)
    const categories=await res.json()
    // console.log(categories);
    return (
        <div className='flex gap-4 container mx-auto'>
            <Link href={'/'}><Button>হোম</Button></Link>
            
            {categories.map(category=>(
                <Link href={`/category/${category.slug}`} key={category.id}><div  >
                    <span>{category.icon}</span>
                    <span>{category.nameBn}</span>
                </div>
                </Link>
            ))}
        </div>
    );
};

export default Navlinks;