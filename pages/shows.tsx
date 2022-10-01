import { NextPage } from 'next';
import useShows from '../hooks/useShows';
import Thumbnail from '../components/Shows/thumbnail';

export const Shows: NextPage = () => {
  const shows = useShows();

  return (
    <main className='flex items-center p-4 flex-col w-screen'>
      <section className='max-w-4xl w-full bg-zinc-800 p-4 rounded shadow flex flex-col gap-2'>
        {shows?.map((show) => (
          <Thumbnail key={show.media.id} show={show} />
        ))}
      </section>
    </main>
  );
};

export default Shows;
