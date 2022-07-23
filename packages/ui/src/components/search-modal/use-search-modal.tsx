import { createContext, ReactNode, useContext, useState } from 'react';
import { SearchModal } from '.';

type SearchModalProviderProps = {
  children: ReactNode;
};

type SearchModalContext = {
  openModal: () => void;
  closeModal: () => void;
  filterText: string;
  onFilterTextChange: (value: string) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
};

const SearchModalContext = createContext({} as SearchModalContext);

export function useSearchModalContext() {
  return useContext(SearchModalContext);
}

export function SearchModalProvider({ children }: SearchModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <SearchModalContext.Provider
      value={{
        openModal,
        closeModal,
        filterText,
        onFilterTextChange: setFilterText,
        inStockOnly,
        onInStockOnlyChange: setInStockOnly,
      }}
    >
      {children}

      <SearchModal isOpen={isOpen} />
    </SearchModalContext.Provider>
  );
}
