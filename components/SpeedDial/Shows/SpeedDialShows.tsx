import { useMemo } from "react";
import ShowModel from "../../../models/ShowModel";
import type Show from "./Show";
import { ShowItem } from "./ShowItem/ShowItem";

type Props = {
  shows: Show[];
};

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

export default function SpeedDialShows(props: Props) {
  const shows: ShowModel[] = useMemo(() => {
    const models = props.shows
      .map((show) => new ShowModel(show))
      .sort(showSort)
      .slice(0, 4);

    return models;
  }, [props.shows]);

  const handleShowMoreShows = () => {
    console.log("TODO");
  };

  return (
    <div className="flex flex-col transition-transform">
      <div className="bg-zinc-800 rounded overflow-hidden">
        {shows.map((show) => (
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
  );
}
