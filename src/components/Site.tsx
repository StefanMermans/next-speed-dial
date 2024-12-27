import React from 'react';
import Image from 'next/image';
import type { Site as SiteType } from '@/hooks/useSiteList';
import classNames from 'classnames';

type Props = {
  site: SiteType;
};

export const Site = (props: Props) => {
  const backgroundColor = props.site.backgroundColor || 'white';

  return (
    <a
      href={props.site.url}
      className={classNames(
        { 'p-2': !props.site.noPadding },
        `
        block
        cursor-pointer
        rounded-2xl
        w-24
        h-24
        overflow-hidden
        transform
        hover:scale-110
        transition-transform
        shadow-md
        hover:shadow-xl`,
      )}
      style={{ backgroundColor }}
    >
      <Image
        src={`/${props.site.icon}`}
        alt='site icon'
        width={1}
        height={1}
        sizes='100vw'
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </a>
  );
};
