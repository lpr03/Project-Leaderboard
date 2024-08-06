import { CookiesProvider } from 'react-cookie';
import '../styles/global.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}