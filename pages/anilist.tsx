import next, { NextPage } from 'next';

const ID = 5367;
const REDIRECT_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/anilist/redirect`;

const URL = `https://anilist.co/api/v2/oauth/authorize?client_id=${ID}&redirect_uri=${REDIRECT_URL}&response_type=code`

export const Anilist: NextPage = () => {


  return (
    <div>
      <div>Anilist</div>
      <a
        className='cursor-pointer'
        href={URL}
      >
        Login with AniList
      </a>
    </div>
  );
};

export default Anilist;
