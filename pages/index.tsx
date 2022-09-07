import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { BOOKMARK_WIDTH, SiteList } from "../components/SpeedDial/SiteList";
import background from "../background-compressed.jpg";
import Clock from "../components/Clock/Clock";

function getWindowSize() {
  if (typeof window === 'undefined') {
    return [0, 0];
  }

  return [window.innerWidth, window.innerHeight];
}

function useWindowResize() {
  const [size, setSize] = useState(getWindowSize());

  useEffect(() => {
    function resizeListener() {
      setSize(getWindowSize());
    }

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return size;
}

const usePadding = () => {
  const [windowWidth] = useWindowResize();

  return useMemo(() => {
    const count = Math.floor(windowWidth / BOOKMARK_WIDTH);
    const excessSpace = windowWidth - count * BOOKMARK_WIDTH;
    return excessSpace / 2;
  }, [windowWidth]);
};

const Index: NextPage = () => {
  // const padding = usePadding();

  return (
    <main
      className="w-screen h-screen flex flex-col bg-no-repeat bg-center bg-cover overflow-hidden"
      style={{
        backgroundImage: `url(${background.src})`,
        boxShadow: "inset 0px 0px 200px 16px rgba(0,0,0,0.75)",
      }}
    >
      <Head>
        <title>Next speed dial</title>
        <meta name="description" content="The next speed dial." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-100 flex justify-center">
        <SiteList />
      </div>
      <div
        className="flex justify-between box-border h-1/3 flex-grow items-end"
      >
        <Clock />
        {/* <SpeedDialShows /> */}
      </div>
    </main>
  );
};

export default Index;
