import React from 'react';
import Image from 'next/image';
import Show from '../Show';

type props = {
  show: Show;
};

export const ThumbNail: React.FC<props> = ({ show }) => {
  return (
    <div className='h-8 w-16'>
      <Image
        layout='responsive'
        objectFit='cover'
        width={1}
        height={2}
        alt={show.media.title.romaji}
        src={show.media.coverImage.large}
      />
    </div>
  );
};
