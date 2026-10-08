import Banner from '@/component/Banner';
import baseUrl from '@/component/Baseurl';
import ProductCard from '@/component/ProductCard';
import React from 'react';

const HomePage = async() => {
  const res = await fetch(`${baseUrl}/api/bazardor/products`);
  const products = await res.json();
  console.log(products);


  const downProducts=products.filter((product)=>product.change.dir=='down').sort((a,b)=>b.change.pct-a.change.pct).slice(0,6)
  console.log(downProducts);


   const upProducts=products.filter((product)=>product.change.dir=='up').sort((a,b)=>b.change.pct-a.change.pct).slice(0,6)
  

  const toBengaliNumber = (number) => {
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    return String(number).replace(/\d/g, (digit) => {
      return bengaliDigits[digit];
    });
  };
 
  return (
    <div>
      <Banner></Banner>
      {/* up products */}
      <h2 className='text-2xl font-bold my-5 '><span className='text-red-500 font-bold mr-1'>↑</span>আজ দাম বেড়েছে</h2>
      <div className='grid grid-cols-4 gap-3 justify-between'>
        {upProducts.map(product=><ProductCard key={product.id} product={product}></ProductCard>)}
      </div>
      {/* down products  */}
      <h2 className='text-2xl font-bold my-5 '><span className='text-red-500 font-bold mr-1'>↑</span>আজ দাম কমেছে</h2>
      <div className='grid grid-cols-4 gap-3 justify-between'>
        {downProducts.map(product=><ProductCard key={product.id} product={product}></ProductCard>)}
      </div>
      {/* all products */}
       <h2 className='text-2xl font-bold mt-5 '>সব পণ্য</h2>
       <p className='text-gray-500 mb-4'>{`মোট ${toBengaliNumber(products.length)} টি পণ্য দেখানো হচ্ছে`}</p>
      <div id='allProduct' className='grid grid-cols-4 gap-3 justify-between'>
        {products.map(product=><ProductCard key={product.id} product={product}></ProductCard>)}
      </div>
    </div>
  );
};

export default HomePage;