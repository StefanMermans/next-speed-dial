import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import background from "../background-compressed.jpg";
import Clock from "../components/Clock/Clock";
import { SiteList } from "../components/SpeedDial/SiteList";
import cn from "classnames";

const SpeedDialShowsNoSSR = dynamic(
  () => import("../components/SpeedDial/Shows/SpeedDialShows"),
  { ssr: false }
);

import styles from "../css/SpeedDial.module.css";
import dynamic from "next/dynamic";

export const Index: NextPage = () => {
  return (
    <main
      className="w-screen h-screen flex flex-col bg-no-repeat bg-center bg-cover overflow-x-hidden"
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
      <div className="p-4 h-full flex flex-col justify-between">
        <div className={cn(styles.grid)}>
          <SiteList />
        </div>
        <div className={styles.footer}>
          <div className="w-full flex justify-between col-span-full">
            <Clock />
            <SpeedDialShowsNoSSR />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};
