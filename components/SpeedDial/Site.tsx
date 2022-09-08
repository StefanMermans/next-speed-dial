import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Site as SiteType } from "../../hooks/useSiteList";

type Props = {
  site: SiteType;
};

export const Site = (props: Props) => {
  const backgroundColor = props.site.backgroundColor || "white";

  return (
    <div className="p-2">
      <Link href={props.site.url}>
        <div
          className="
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
          <Image
            src={`/${props.site.icon}`}
            layout="responsive"
            alt="site icon"
            width={1}
            height={1}
          />
        </div>
      </Link>
    </div>
  );
};
