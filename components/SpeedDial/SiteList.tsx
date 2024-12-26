import React from 'react';
import { Site } from './Site';
import useSiteList from '../../hooks/useSiteList';

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
