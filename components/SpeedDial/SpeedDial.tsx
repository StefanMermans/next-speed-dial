import useWindowResize from "../../hooks/useWindowSize";
import Clock from "../Clock/Clock";
import type Show from "./Shows/Show";
import SpeedDialShows from "./Shows/SpeedDialShows";
import { BOOKMARK_WIDTH, SiteList } from "./SiteList";

import styles from "./list.module.css";

type Props = {
  shows: Show[];
};

const usePadding = () => {
  const [windowWidth] = useWindowResize();
  const itemCount = Math.floor(windowWidth / BOOKMARK_WIDTH);

  return (windowWidth - itemCount * BOOKMARK_WIDTH) / 2;
};

export default function SpeedDial(props: Props) {
  const padding = usePadding();

  return (
    <>
      <div className={styles.grid}>
        <SiteList />
        <Clock />
        <div className={styles.shows}>

        </div>
      </div>
      {/* <div
        className="flex justify-between box-border h-1/3 flex-grow items-end py-8"

        // style={{
        //   paddingLeft: padding + 8,
        //   paddingRight: padding + 8,
        // }}
      >
        {/* <SpeedDialShows shows={props.shows} /> */}
      {/* </div> */}
    </>
  );
}
