import React from 'react';
import Image from 'next/image';
import type { Site as SiteType } from '../../hooks/useSiteList';

type Props = {
  site: SiteType;
};

export const Site = (props: Props) => {
  const backgroundColor = props.site.backgroundColor || 'white';

  return (
    <a
      href={props.site.url}
      className="
        block
        cursor-pointer
        rounded-2xl
        w-24
        h-24
        p-2
        overflow-hidden
        transform
        hover:scale-110
        transition-transform
        shadow-md
        hover:shadow-xl"
      style={{ backgroundColor }}
    >
      <Image src={`/${props.site.icon}`} layout="responsive" alt="site icon" width={1} height={1} />
    </a>
  );
};
