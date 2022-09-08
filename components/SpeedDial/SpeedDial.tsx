import { useEffect, useState } from "react";
import Clock from "../Clock/Clock";
import { BOOKMARK_WIDTH, SiteList } from "./SiteList";

type Props = {};

function getWindowSize() {
  if (typeof window === "undefined") {
    return [1920, 1080];
  }

  return [window.innerWidth, window.innerHeight];
}

function useWindowResize() {
  const [size, setSize] = useState(getWindowSize);

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
  const itemCount = Math.floor(windowWidth / BOOKMARK_WIDTH);

  return (windowWidth - itemCount * BOOKMARK_WIDTH) / 2;
};

export default function SpeedDial(props: Props) {
  const padding = usePadding();

  return (
    <>
      <div
        className="w-screen flex flex-wrap pt-6"
        style={{
          paddingLeft: padding,
          paddingRight: padding,
        }}
      >
        <SiteList />
      </div>
      <div
        className="flex justify-between box-border h-1/3 flex-grow items-end py-8"
        style={{
          paddingLeft: padding + 8,
          paddingRight: padding + 8,
        }}
      >
        <Clock />
        {/* <SpeedDialShows /> */}
      </div>
    </>
  );
}
