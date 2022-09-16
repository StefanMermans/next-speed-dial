import { Suspense } from 'react';
import useShows from '../../../hooks/useShows';
import { ShowItem } from './ShowItem/ShowItem';

export default function SpeedDialShows() {
  const shows = useShows(4);

  const handleShowMoreShows = () => {
    console.log('TODO');
  };

  return (
    <Suspense>
      {shows && (
        <div className="flex flex-col transition-transform">
          <div className="bg-zinc-800 rounded overflow-hidden">
            {shows.map((show) => (
              <ShowItem key={show.media.id} show={show} />
            ))}
          </div>
          <div className="flex justify-center cursor-pointer" onClick={handleShowMoreShows}>
            Show more
          </div>
        </div>
      )}
    </Suspense>
  );
}
