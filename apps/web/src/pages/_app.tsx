import type { AppProps } from 'next/app';
import { NavBar } from 'ui';
import '../styles/globals.css';
import { navigation } from '../utils';

export default function WebApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar navigation={navigation} />
      <Component {...pageProps} />
    </>
  );
}
