import { createContext, ReactNode, useContext, useState } from 'react';
import { Country, CountrySelector } from './country-selector';
import { useLocalStorage } from '../../hooks';

type CountrySelectorProviderProps = {
  children: ReactNode;
};

type CountrySelectorContext = {
  openModal: () => void;
  closeModal: () => void;
  selectedCountry: Country;
  onSelectCountry(value: Country): void;
  selectedLanguage: string;
  onSelectLanguage(value: string): void;
};

const CountrySelectorContext = createContext({} as CountrySelectorContext);

export function useCountrySelectorContext() {
  return useContext(CountrySelectorContext);
}

export function CountrySelectorProvider({
  children,
}: CountrySelectorProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useLocalStorage<Country>(
    'country',
    {} as Country
  );

  const [selectedLanguage, setSelectedLanguage] = useLocalStorage<string>(
    'country',
    ''
  );

  const onSelectCountry = (value: Country) => setSelectedCountry(value);
  const onSelectLanguage = (value: string) => setSelectedLanguage(value);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <CountrySelectorContext.Provider
      value={{
        selectedCountry,
        onSelectCountry,
        selectedLanguage,
        onSelectLanguage,
        openModal,
        closeModal,
      }}
    >
      {children}
      <CountrySelector isOpen={isModalOpen} />
    </CountrySelectorContext.Provider>
  );
}
