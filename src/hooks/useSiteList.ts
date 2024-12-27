import SITES from './sites';

export type Site = {
  name: string;
  url: string;
  icon: string;
  backgroundColor?: string;
  noPadding?: boolean;
};

export default function useSiteList(): Site[] {
  return SITES;
}
