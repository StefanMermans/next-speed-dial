import { useQuery } from "@tanstack/react-query";
import { Suspense, useMemo } from "react";
import ShowModel from "../../../models/ShowModel";
import type Show from "./Show";
import { AnilistData } from "./Show";
import { ShowItem } from "./ShowItem/ShowItem";

function showSort(showA: ShowModel, showB: ShowModel) {
  const aEps = showA.episodesToWatch();
  const bEps = showB.episodesToWatch();

  if (aEps !== 0 || bEps !== 0) {
    return showB.episodesToWatch() - showA.episodesToWatch();
  }

  const [nextA] = showA.getNextEpisode();
  const [nextB] = showB.getNextEpisode();

  // TODO: what if an episode is null?
  return (nextA?.timeUntilAiring ?? 0) - (nextB?.timeUntilAiring ?? 0);
}

async function fetchShows() {
  const response = await fetch(process.env.NEXT_PUBLIC_ANILIST_URL ?? "", {
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
  return (
    data.data.MediaListCollection.lists.find(
      (list: any) => list.name === "Watching"
    )?.entries ?? []
  );
}

export default function SpeedDialShows() {
  const showQuery = useQuery(["shows"], fetchShows, {
    select: (shows) => {
      return shows
        .map((show) => new ShowModel(show))
        .sort(showSort)
        .slice(0, 4);
    },
  });

  const handleShowMoreShows = () => {
    console.log("TODO");
  };

  return (
    <Suspense>
      {showQuery.data && (
        <div className="flex flex-col transition-transform">
          <div className="bg-zinc-800 rounded overflow-hidden">
            {showQuery.data.map((show) => (
              <ShowItem key={show.media.id} show={show} />
            ))}
          </div>
          <div
            className="flex justify-center cursor-pointer"
            onClick={handleShowMoreShows}
          >
            Show more
          </div>
        </div>
      )}
    </Suspense>
  );
}
