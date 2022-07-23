/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link';
import React from 'react';
import { Product } from '../product-overview/types';

interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>

        <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <NextLink href={product.href} passHref>
                <a className='relative group'>
                  <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className='w-full h-full object-center object-cover group-hover:opacity-75'
                    />
                  </div>
                  <h3 className='mt-4 text-sm text-gray-700'>{product.name}</h3>
                  <p className='mt-1 text-lg font-medium text-gray-900'>
                    ${product.price}
                  </p>
                </a>
              </NextLink>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
