import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import {
  CartProvider,
  CountrySelectorProvider,
  ModalProvider,
  NavBar,
  SearchModalProvider,
} from 'ui';
import '../styles/globals.css';
import { navigation } from '../utils';

export default function WebApp({ Component, pageProps }: AppProps) {
  return (
    <CountrySelectorProvider>
      <SearchModalProvider>
        <ModalProvider>
        <CartProvider>
          <Toaster />
          <NavBar navigation={navigation} />
          <Component {...pageProps} />
        </CartProvider>
        </ModalProvider>
      </SearchModalProvider>
    </CountrySelectorProvider>
  );
}
