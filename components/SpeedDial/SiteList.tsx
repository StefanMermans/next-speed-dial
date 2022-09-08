import React from "react";
import useSiteList from "../../hooks/useSiteList";
import { Site } from "./Site";

export const BOOKMARK_WIDTH = 96 + 16;

interface props {}

export const SiteList = ({}: props) => {
  const sites = useSiteList();

  return (
    <>
      {sites.map((site) => (
        <Site key={site.name} site={site} />
      ))}
    </>
  );
};
