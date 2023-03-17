import { AnilistAuth, requestGraphQL } from '../request';

type WrappedUser = {
  data: {
    Viewer: AnilistUser;
  };
};

export type AnilistUser = {
  id: number;
  name: string;
};

export async function currentUser(auth: AnilistAuth): Promise<AnilistUser> {
  const response = await requestGraphQL<WrappedUser>({
    auth,
    query: `
      query {
        Viewer {
          id
          name
        }
      }
    `,
  });

  return response.data.Viewer;
}
