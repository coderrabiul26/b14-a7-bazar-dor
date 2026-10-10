'use client';

import React, { useEffect, useState } from 'react';
import baseUrl from './Baseurl';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navlinks = () => {
    const pathName = usePathname();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/bazardor/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className='flex gap-4 container mx-auto items-center'>
            <Link href={'/'}>
                <Button className={pathName === '/' ? 'bg-green-500 text-white rounded-full' : 'bg-white text-black '}>
                    হোম
                </Button>
            </Link>
            
            {categories.map((category) => {
                const href = `/category/${category.slug}`;
                const isActive = pathName === href;

                return (
                    <Link href={href} key={category.id}>
                        <div className={`flex items-center gap-2 p-2 rounded-full ${isActive ? 'bg-green-500 text-white font-semibold' : ''}`}>
                            <span>{category.icon}</span>
                            <span>{category.nameBn}</span>
                        </div>
                    </Link>
                );
            })}
    
        </div>
    );
};

export default Navlinks;