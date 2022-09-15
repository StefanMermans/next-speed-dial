import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import background from "../background-compressed.jpg";
import Show, { AnilistData } from "../components/SpeedDial/Shows/Show";
import useServiceWorker from "../hooks/userServiceWorker";

const NoSSRSpeedDial = dynamic(
  () => import("../components/SpeedDial/SpeedDial"),
  {
    ssr: false,
  }
);

type Props = {
  shows: Show[];
};

export const Index: NextPage<Props> = ({ shows }: Props) => {
  useServiceWorker();

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
      <NoSSRSpeedDial shows={shows} />
    </main>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return { props: {shows: []}};

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
