import type { AppProps } from 'next/app';
import { CartProvider, NavBar, SearchModalProvider } from 'ui';
import '../styles/globals.css';
import { navigation } from '../utils';
import { Toaster } from 'react-hot-toast';

export default function WebApp({ Component, pageProps }: AppProps) {
  return (
    <SearchModalProvider>
    <CartProvider>
      <Toaster />
      <NavBar navigation={navigation} />
      <Component {...pageProps} />
    </CartProvider>
    </SearchModalProvider>
  );
}
