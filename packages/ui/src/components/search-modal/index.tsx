/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Product } from '../product-overview/types';
import { products } from './products';
import { useSearchModalContext } from './use-search-modal';

interface SearchModalProps {
  isOpen: boolean;
  title?: string;
  containerClassName?: string;
  closable?: boolean;
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
}) {
  // className='flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700'
  return (
    <form className='mt-6'>
      <div className='space-y-4'>
        <input
          type='text'
          value={filterText}
          placeholder='Search...'
          onChange={(e) => onFilterTextChange(e.target.value)}
          className='flex items-center w-full text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400'
        />
        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <input
              id='comments'
              name='comments'
              type='checkbox'
              className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
              checked={inStockOnly}
              onChange={(e) => onInStockOnlyChange(e.target.checked)}
            />
          </div>
          <div className='ml-3 text-sm'>
            <label htmlFor='inStock' className='font-medium text-gray-700'>
              In Stock
            </label>
            <p className='text-gray-500'>Only show products in stock.</p>
          </div>
        </div>
      </div>
    </form>
  );
}

function ProductItem({ product }: { product: Product }) {
  const router = useRouter();
  const { closeModal } = useSearchModalContext();
  return (
    <li className='flex py-6'>
      <div
        className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border cursor-pointer border-gray-200'
        onClick={() => {
          router.push(product.href), closeModal();
        }}
      >
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className='h-full w-full object-cover object-center'
        />
      </div>

      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <h3
              className='cursor-pointer'
              onClick={() => {
                router.push(product.href), closeModal();
              }}
            >
              {product.name}
            </h3>
            <p className='ml-4'>${product.price}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

function ProductTable({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { filterText } = useSearchModalContext();

  useEffect(() => {
    const filteredProduct = products.filter((product) => {
      return product.name.toLowerCase().includes(filterText.toLowerCase());
    });

    if (filterText === '') {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(filteredProduct);
    }

    return () => setFilteredProducts([]);
  }, [filterText, products]);

  return (
    <>
      {filteredProducts?.map((product) => (
        <ProductItem product={product} key={product.name} />
      ))}
    </>
  );
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  title,
  closable = true,
}) => {
  const {
    closeModal,
    filterText,
    onFilterTextChange,
    onInStockOnlyChange,
    inStockOnly,
  } = useSearchModalContext();

  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 md:pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-full md:max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Make a search
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={closeModal}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <SearchBar
                        filterText={filterText}
                        inStockOnly={inStockOnly}
                        onFilterTextChange={onFilterTextChange}
                        onInStockOnlyChange={onInStockOnlyChange}
                      />

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            <ProductTable products={products} />
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
