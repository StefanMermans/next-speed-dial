export type ICoverImage = {
  large: string;
  color: string;
  medium: string;
  extraLarge: string;
};

export type IPageInfo = {
  total: number;
  perPage: number;
  lastPage: number;
  currentPage: number;
  hasNextPage: boolean;
};

export type IAiringScheduleEpisode = {
  id: number;
  airingAt: number;
  timeUntilAiring: number;
};

export type IAiringSchedule = {
  pageInfo: IPageInfo;
  nodes: IAiringScheduleEpisode[];
};

export type ITitle = {
  english: string;
  romaji: string;
};

export type INextAiringEpisode = {
  id: number;
  airingAt: number;
  timeUntilAiring: number;
};

export type IMediaData = {
  id: number;
  type: string;
  title: ITitle;
  episodes: number;
  coverImage: ICoverImage;
  airingSchedule: IAiringSchedule;
  nextAiringEpisode: INextAiringEpisode | null;
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED';
};

export type Show = {
  media: IMediaData;
  progress: number;
};

type List = {
  entries: Show[];
};

type MediaListCollection = {
  lists: List[];
};

export type AnilistData = {
  data: {
    MediaListCollection: MediaListCollection;
  };
};

export default Show;
