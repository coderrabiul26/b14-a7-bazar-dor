import baseUrl from '@/component/Baseurl';
import React from 'react';

const CategoryPage = async({params}) => {
    const{categoryslug}=await params
  

    const res=await fetch(`${baseUrl}/api/bazardor/products?category=${categoryslug}`)
    const data=await res.json()
    console.log(data);

    const response=await fetch(`${baseUrl}/api/bazardor/categories`)
   
    return (
        <div>
            category page
        </div>
    );
};

export default CategoryPage;