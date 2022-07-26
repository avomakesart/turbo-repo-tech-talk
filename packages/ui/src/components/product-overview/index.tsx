/* eslint-disable @next/next/no-img-element */
import { RadioGroup } from '@headlessui/react';
import { StarIcon, CheckCircleIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Product, ProductReviews, Color, Size } from './types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useCartContext } from '../cart/use-cart-context';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ProductOverviewProps {
  product: Product;
  reviews: ProductReviews;
  onAddClick: (item: Product) => void;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({
  product,
  reviews,
  onAddClick,
}) => {
  const [selectedColor, setSelectedColor] = useState<Color[]>();
  const [selectedSize, setSelectedSize] = useState<Size[]>();
  
  const { openCart } = useCartContext();

  const handleAddToBag = (item: Product) => {    
    const customItem = {
      ...item,
      colors: selectedColor as Color[],
      sizes: selectedSize as Size[],
    };
    onAddClick(customItem);
    toast.success(
      (t) => {
        return (
          <div className='flex flex-col -mt-[0.3rem]'>
            1 Item added
            <button
              onClick={() => {
                openCart(), toast.dismiss(t.id);
              }}
              className='w-full mt-5 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              View your cart
            </button>
          </div>
        );
      },
      {
        position: 'top-right',
        style: { alignItems: 'flex-start' },
      }
    );
  };

  return (
    <div className='bg-white'>
      <div className='pt-6'>
        <nav aria-label='Breadcrumb'>
          <ol
            role='list'
            className='max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8'
          >
            {product.breadcrumbs?.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className='flex items-center'>
                  <a
                    href={breadcrumb.href}
                    className='mr-2 text-sm font-medium text-gray-900'
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox='0 0 16 20'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='w-4 h-5 text-gray-300'
                  >
                    <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                  </svg>
                </div>
              </li>
            ))}
            <li className='text-sm'>
              <a
                href={product.href}
                aria-current='page'
                className='font-medium text-gray-500 hover:text-gray-600'
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
          <div className='hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block'>
            <img
              src={product.images ? product.images[0].src : ''}
              alt={product.images ? product.images[0].alt : ''}
              className='w-full h-full object-center object-cover'
            />
          </div>
          <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
            <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
              <img
                src={product.images ? product.images[1].src : ''}
                alt={product.images ? product.images[1].alt : ''}
                className='w-full h-full object-center object-cover'
              />
            </div>
            <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
              <img
                src={product.images ? product.images[2].src : ''}
                alt={product.images ? product.images[2].alt : ''}
                className='w-full h-full object-center object-cover'
              />
            </div>
          </div>
          <div className='aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4'>
            <img
              src={product.images ? product.images[3].src : ''}
              alt={product.images ? product.images[3].alt : ''}
              className='w-full h-full object-center object-cover'
            />
          </div>
        </div>

        {/* Product info */}
        <div className='max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8'>
          <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className='mt-4 lg:mt-0 lg:row-span-3'>
            <h2 className='sr-only'>Product information</h2>
            <p className='text-3xl text-gray-900'>${product.price}</p>

            {/* Reviews */}
            <div className='mt-6'>
              <h3 className='sr-only'>Reviews</h3>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? 'text-gray-900'
                          : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden='true'
                    />
                  ))}
                </div>
                <p className='sr-only'>{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className='mt-10'>
              {/* Colors */}
              <div>
                <h3 className='text-sm text-gray-900 font-medium'>Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className='mt-4'
                >
                  <RadioGroup.Label className='sr-only'>
                    Choose a color
                  </RadioGroup.Label>
                  <div className='flex items-center space-x-3'>
                    {product.colors?.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as='span' className='sr-only'>
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden='true'
                          className={classNames(
                            color.class,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className='mt-10'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-sm text-gray-900 font-medium'>Size</h3>
                  <a
                    href='#'
                    className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Size guide
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className='mt-4'
                >
                  <RadioGroup.Label className='sr-only'>
                    Choose a size
                  </RadioGroup.Label>
                  <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
                    {product.sizes?.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as='span'>
                              {size.name}
                            </RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'absolute -inset-px rounded-md pointer-events-none'
                                )}
                                aria-hidden='true'
                              />
                            ) : (
                              <span
                                aria-hidden='true'
                                className='absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none'
                              >
                                <svg
                                  className='absolute inset-0 w-full h-full text-gray-200 stroke-2'
                                  viewBox='0 0 100 100'
                                  preserveAspectRatio='none'
                                  stroke='currentColor'
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect='non-scaling-stroke'
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type='button'
                className='mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                onClick={() => handleAddToBag(product)}
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className='py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            {/* Description and details */}
            <div>
              <h3 className='sr-only'>Description</h3>

              <div className='space-y-6'>
                <p className='text-base text-gray-900'>{product.description}</p>
              </div>
            </div>

            <div className='mt-10'>
              <h3 className='text-sm font-medium text-gray-900'>Highlights</h3>

              <div className='mt-4'>
                <ul role='list' className='pl-4 list-disc text-sm space-y-2'>
                  {product.highlights?.map((highlight) => (
                    <li key={highlight} className='text-gray-400'>
                      <span className='text-gray-600'>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='mt-10'>
              <h2 className='text-sm font-medium text-gray-900'>Details</h2>

              <div className='mt-4 space-y-6'>
                <p className='text-sm text-gray-600'>{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
