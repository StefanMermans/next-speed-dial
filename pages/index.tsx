import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import background from "../background-compressed.jpg";
import Clock from "../components/Clock/Clock";
import Show, { AnilistData } from "../components/SpeedDial/Shows/Show";
import SpeedDialShows from "../components/SpeedDial/Shows/SpeedDialShows";
import { SiteList } from "../components/SpeedDial/SiteList";
import cn from "classnames";

import styles from "../css/SpeedDial.module.css";

type Props = {
  shows: Show[];
};

export const Index: NextPage<Props> = ({ shows }: Props) => {
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
            <SpeedDialShows shows={shows} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch(process.env.ANILIST_URL ?? "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      variables: {
        name: "Skyflyer97",
      },
      query: `
        query ($name: String!) {
          MediaListCollection(userName: $name, type: ANIME) {
            lists {
              name
              isCustomList
              isSplitCompletedList
              status
              entries {
                progress
                media {
                  type
                  id
                  coverImage {
                    extraLarge
                    large
                    medium
                    color
                  }
                  nextAiringEpisode {
                    id
                    airingAt
                    timeUntilAiring
                  }
                  airingSchedule(perPage: 100) {
                    pageInfo {
                      total
                      perPage
                      currentPage
                      lastPage
                      hasNextPage
                    }
                    nodes {
                      id
                      airingAt
                      timeUntilAiring
                    }
                  }
                  episodes
                  status
                  title {
                    english
                    romaji
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });
  const data: AnilistData = await response.json();
  const shows =
    data.data.MediaListCollection.lists.find(
      (list: any) => list.name === "Watching"
    )?.entries ?? [];

  return { props: { shows } };
};
