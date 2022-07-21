import type { AppProps } from 'next/app';
import { CartProvider, NavBar } from 'ui';
import '../styles/globals.css';
import { navigation } from '../utils';

export default function WebApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <>
        <NavBar navigation={navigation} />
        <Component {...pageProps} />
      </>
    </CartProvider>
  );
}
