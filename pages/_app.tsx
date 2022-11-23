import '../styles/globals.css';
import type {AppProps} from 'next/app';
// eslint-disable-next-line camelcase
import {Open_Sans} from '@next/font/google';

// eslint-disable-next-line new-cap
const inter = Open_Sans();

export default function App({Component, pageProps}: AppProps): JSX.Element {
  return (
    <div>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main></div>
  );
}
