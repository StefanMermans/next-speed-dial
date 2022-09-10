import { GraphQLClient } from "graphql-request";

export const anilistClient = new GraphQLClient(
  `${process.env.REACT_APP_ANILIST_URL}`
);
