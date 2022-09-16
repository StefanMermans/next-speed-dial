import React from 'react';
import { Site } from './Site';
import useSiteList from '../../hooks/useSiteList';

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
