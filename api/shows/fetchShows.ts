import { AnilistData } from '../../components/SpeedDial/Shows/Show';
import { requestGraphQL } from '../anilist/request';

export async function fetchShows() {
  const data = await requestGraphQL<AnilistData>({
    variables: {
      name: 'Skyflyer97',
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
                siteUrl
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
  });

  return data.data.MediaListCollection.lists.find((list: any) => list.name === 'Watching')?.entries ?? [];
}
