import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchShows } from '../api/shows/fetchShows';
import ShowModel from '../models/ShowModel';

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

export default function useShows(count?: number) {
  const showQuery = useQuery(['shows'], fetchShows, {
    select: (shows) => {
      return shows.map((show) => new ShowModel(show)).sort(showSort);
    },
  });

  return useMemo(() => {
    if (!showQuery.data) {
      return undefined;
    }

    return showQuery.data.slice(0, count);
  }, [count, showQuery.data]);
}
