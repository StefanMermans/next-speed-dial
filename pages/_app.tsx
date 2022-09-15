import "../styles/globals.css";
import type { AppProps } from "next/app";
import useServiceWorker from "../hooks/userServiceWorker";

function MyApp({ Component, pageProps }: AppProps) {
  useServiceWorker();

  return <Component {...pageProps} />;
}

export default MyApp;
