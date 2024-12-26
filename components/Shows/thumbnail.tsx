import Image from "next/image";
import { useMemo } from 'react';
import ShowModel from '../../models/ShowModel';

type props = {
  show: ShowModel;
};

function useContent(show: ShowModel) {
  return useMemo(() => {
    return show.formatContent();
  }, [show]);
}

function useProgressText(show: ShowModel) {
  return `seen: ${show.progress} episodes`;
}

export default function Thumbnail({ show }: props) {
  const content = useContent(show);
  const progressText = useProgressText(show);
  const areNamesSame = show.romaji.toUpperCase() === show.english.toUpperCase();

  return (
    (<div className='flex gap-4'>
      <Image
        height={178}
        width={128}
        src={show.media.coverImage.large}
        alt={`${show.english} thumbnail`}
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "cover"
        }} />
      <div className='flex justify-between w-full'>
        <div>
          <div>{show.romaji}</div>
          {!areNamesSame && <div className='text-gray-400'>{show.english}</div>}
          <a className='flex items-center gap-2' href={show.media.siteUrl} target='blank' rel='noreferrer'>
            <Image
              src='/images/anilist-icon.svg'
              width={30}
              height={30}
              alt='Anilist icon'
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover"
              }} />
            View on Anilist
          </a>
        </div>
        <div>
          <div>{progressText}</div>
          <div>{content}</div>
        </div>
      </div>
    </div>)
  );
}
