import SITES from './sites';

export type Site = {
  name: string;
  url: string;
  icon: string;
  backgroundColor?: string;
};

export default function useSiteList(): Site[] {
  return SITES;
}
