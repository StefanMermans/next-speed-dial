import React from 'react';

import { ThumbNail } from './thumbnail';
import { NextEpisode } from './NextEpisode';
import ShowModel from '../../../../models/ShowModel';

interface props {
  show: ShowModel;
}

export const ShowItem: React.FC<props> = ({ show }) => {
  return (
    <div className='bg-gray-2 flex'>
      <ThumbNail show={show} />
      <div className='flex justify-between p-4 w-full '>
        <div>
          <div className='max-w-sm overflow-hidden whitespace-nowrap text-ellipsis'>{show.media.title.romaji}</div>
          <div className='text-sm text-gray-400'>{show.media.title.english}</div>
        </div>
        <NextEpisode show={show} />
      </div>
    </div>
  );
};
