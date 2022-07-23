/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  Color,
  Product,
  ProductReviews,
  Size,
} from '../product-overview/types';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import { useCartContext } from '../cart/use-cart-context';
import { classNames } from '../../utils';
import toast from 'react-hot-toast';

interface ProductQuickViewProps {
  isOpen?: boolean;
  product: Product;
  reviews: ProductReviews;
  onAddClick: (item: Product) => void;
  onOpen: (value: boolean) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  isOpen = false,
  product,
  reviews,
  onAddClick,
  onOpen,
}) => {
  const [selectedColor, setSelectedColor] = React.useState<Color[]>();
  const [selectedSize, setSelectedSize] = React.useState<Size[]>();

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
            1 ITEM ADDED
            <button
              onClick={() => {
                openCart(), toast.dismiss(t.id), onOpen(false);
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
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onOpen}>
        <Transition.Child
          as={React.Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            >
              <Dialog.Panel className='flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl'>
                <div className='w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
                  <button
                    type='button'
                    className='absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
                    onClick={() => onOpen(false)}
                  >
                    <span className='sr-only'>Close</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </button>

                  <div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
                    <div className='aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5'>
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className='object-center object-cover'
                      />
                    </div>
                    <div className='sm:col-span-8 lg:col-span-7'>
                      <h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>
                        {product.name}
                      </h2>

                      <section
                        aria-labelledby='information-heading'
                        className='mt-2'
                      >
                        <h3 id='information-heading' className='sr-only'>
                          Product information
                        </h3>

                        <p className='text-2xl text-gray-900'>
                          {product.price}
                        </p>

                        {/* Reviews */}
                        <div className='mt-6'>
                          <h4 className='sr-only'>Reviews</h4>
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
                            <p className='sr-only'>
                              {reviews.average} out of 5 stars
                            </p>
                            <a
                              href='#'
                              className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'
                            >
                              {reviews.totalCount} reviews
                            </a>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby='options-heading'
                        className='mt-10'
                      >
                        <h3 id='options-heading' className='sr-only'>
                          Product options
                        </h3>

                        <form>
                          {/* Colors */}
                          <div>
                            <h4 className='text-sm text-gray-900 font-medium'>
                              Color
                            </h4>

                            <RadioGroup
                              value={selectedColor}
                              onChange={setSelectedColor}
                              className='mt-4'
                            >
                              <RadioGroup.Label className='sr-only'>
                                Choose a color
                              </RadioGroup.Label>
                              <span className='flex items-center space-x-3'>
                                {product.colors.map((color) => (
                                  <RadioGroup.Option
                                    key={color.name}
                                    value={color}
                                    className={({ active, checked }) =>
                                      classNames(
                                        color.selectedClass,
                                        active && checked
                                          ? 'ring ring-offset-1'
                                          : '',
                                        !active && checked ? 'ring-2' : '',
                                        '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                      )
                                    }
                                  >
                                    <RadioGroup.Label
                                      as='span'
                                      className='sr-only'
                                    >
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
                              </span>
                            </RadioGroup>
                          </div>

                          {/* Sizes */}
                          <div className='mt-10'>
                            <div className='flex items-center justify-between'>
                              <h4 className='text-sm text-gray-900 font-medium'>
                                Size
                              </h4>
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
                              <div className='grid grid-cols-4 gap-4'>
                                {product.sizes.map((size) => (
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
                                        'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
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
                            type='submit'
                            className='mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            onClick={() => handleAddToBag(product)}
                          >
                            Add to bag
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
