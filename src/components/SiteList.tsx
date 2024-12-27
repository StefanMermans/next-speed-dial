import React from 'react';
import { Site } from './Site';
import useSiteList from '@/hooks/useSiteList';

export const SiteList = () => {
  const sites = useSiteList();

  return (
    <>
      {sites.map((site) => (
        <Site key={site.name} site={site} />
      ))}
    </>
  );
};
