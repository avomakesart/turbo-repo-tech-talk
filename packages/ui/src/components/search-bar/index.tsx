import React from 'react';

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) => {
  return (
    <form className='mt-6'>
      <div className='space-y-4'>
        <input
          type='text'
          value={filterText}
          placeholder='Search...'
          onChange={(e) => onFilterTextChange(e.target.value)}
          className='flex items-center w-full text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700'
        />
        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <input
              id='inStockOnly'
              name='inStockOnly'
              type='checkbox'
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
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
};
