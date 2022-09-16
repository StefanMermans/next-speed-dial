import React, { useMemo } from 'react';

import ShowModel from '../../../../models/ShowModel';

interface props {
  show: ShowModel;
}

function useContent(show: ShowModel) {
  return useMemo(() => {
    return show.formatContent();
  }, [show]);
}

function useProgressText(show: ShowModel) {
  return `seen: ${show.progress} episodes`;
}

export const NextEpisode: React.FC<props> = ({ show }) => {
  const content = useContent(show);
  const progressText = useProgressText(show);

  return (
    <div className="flex flex-col items-end">
      <div>{progressText}</div>
      <div>{content}</div>
    </div>
  );
};
