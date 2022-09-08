import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import background from "../background-compressed.jpg";

const NoSSRSpeedDial = dynamic(
  () => import("../components/SpeedDial/SpeedDial"),
  {
    ssr: false,
  }
);

const Index: NextPage = () => {
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
      <NoSSRSpeedDial />
    </main>
  );
};

export default Index;
