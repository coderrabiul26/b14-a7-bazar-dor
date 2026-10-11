
'use client';

import React, { useEffect, useState } from 'react';
import baseUrl from './Baseurl';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navlinks = () => {
    const pathName = usePathname();
    const [categories, setCategories] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetch(`${baseUrl}/api/bazardor/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className='container mx-auto px-2'>
         
            <div className='flex items-center justify-between md:hidden'>
                <Link href='/' onClick={() => setIsMenuOpen(false)}>
                    <Button className={pathName === '/' ? 'bg-green-500 text-white rounded-full' : 'bg-white text-black'}>
                        হোম
                    </Button>
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='text-2xl p-2'
                    aria-label='Toggle navigation menu'
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

       
            {isMenuOpen && (
                <div className='flex flex-col gap-2 py-3 md:hidden'>
                    {categories.map((category) => {
                        const href = `/category/${category.slug}`;
                        const isActive = pathName === href;

                        return (
                            <Link
                                href={href}
                                key={category.id}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className={`flex items-center gap-2 p-3 rounded-full ${
                                    isActive
                                        ? 'bg-green-500 text-white font-semibold'
                                        : 'hover:bg-gray-100'
                                }`}>
                                    <span>{category.icon}</span>
                                    <span>{category.nameBn}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

          
            <div className='hidden md:flex gap-4 items-center'>
                <Link href='/'>
                    <Button className={pathName === '/' ? 'bg-green-500 text-white rounded-full' : 'bg-white text-black'}>
                        হোম
                    </Button>
                </Link>

                {categories.map((category) => {
                    const href = `/category/${category.slug}`;
                    const isActive = pathName === href;

                    return (
                        <Link href={href} key={category.id}>
                            <div className={`flex items-center gap-2 p-2 rounded-full ${
                                isActive
                                    ? 'bg-green-500 text-white font-semibold'
                                    : ''
                            }`}>
                                <span>{category.icon}</span>
                                <span>{category.nameBn}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Navlinks;
