import { useEffect } from "react";

export default function useServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const handleLoad = () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) =>
          console.log(
            `service worker registered with scope: ${registration.scope}`
          )
        )
        .catch((error) =>
          console.error(`Service worker registration failed: ${error}`)
        );
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);
}
