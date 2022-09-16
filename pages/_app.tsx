import '../styles/globals.css';
import type { AppProps } from 'next/app';
import useServiceWorker from '../hooks/userServiceWorker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useServiceWorker();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
