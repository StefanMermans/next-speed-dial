import Image from 'next/image';
import React from 'react';

type Props = {
  site: any;
}

export const Site = (props: Props) => {
  const imageSource = props.site.icon;
  const backgroundColor = props.site.backgroundColor || 'white';

  return (
    <a
      className='
        rounded-2xl
        w-24
        h-24
        p-2
        overflow-hidden
        transform
        hover:scale-110
        transition-transform
        shadow-md
        hover:shadow-xl'
      style={{backgroundColor}}
      href={props.site.url}
    >
      <Image src={`/${imageSource}`} layout='responsive' alt='site icon' width={1} height={1} />
    </a>
  );
};
