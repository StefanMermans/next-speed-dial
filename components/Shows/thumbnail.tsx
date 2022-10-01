import ShowModel from '../../models/ShowModel';
import { NextEpisode } from '../SpeedDial/Shows/ShowItem/NextEpisode';

type props = {
  show: ShowModel;
};

export default function Thumbnail({ show }: props) {
  return (
    <div>
      <div>{show.romaji}</div>
      <NextEpisode show={show} />
    </div>
  );
}
