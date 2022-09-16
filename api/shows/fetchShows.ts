import { AnilistData } from "../../components/SpeedDial/Shows/Show";

export async function fetchShows() {
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