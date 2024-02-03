import { NextApiRequest, NextApiResponse } from 'next';
import { request } from '../../../api/anilist/request';
import { api } from '../../../api/api';
import { getPrismaClient } from '../../../backend/prismaClient';
import * as jwt from 'jsonwebtoken';

const URL = `${process.env.NEXT_PUBLIC_ANILIST_API_URL}/api/v2/oauth/token`;
const REDIRECT_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/anilist/redirect`;

type AuthData = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export default async function redirect(req: NextApiRequest, res: NextApiResponse) {
  const prismaClient = getPrismaClient();

  const authData = await request<AuthData>(URL, {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID,
      client_secret: process.env.ANILIST_SECRET,
      redirect_uri: REDIRECT_URL,
      code: req.query.code,
    }),
  });

  const anilistUser = await api.anilist.user.currentUser({
    accessToken: authData.access_token,
    refreshToken: authData.refresh_token,
  });

  let user = await prismaClient.user.findFirst({
    where: {
      name: anilistUser.name,
    },
  });

  if (!user) {
    user = await prismaClient.user.create({
      data: {
        name: anilistUser.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  await prismaClient.anilistUser.upsert({
    where: {
      anilistId: anilistUser.id,
    },
    update: {
      userId: user.id,
      accessToken: authData.access_token,
      refreshToken: authData.refresh_token,
      expiresAt: getExpiriationDate(authData),
    },
    create: {
      userId: user.id,
      anilistId: anilistUser.id,
      accessToken: authData.access_token,
      refreshToken: authData.refresh_token,
      expiresAt: getExpiriationDate(authData),
    },
  });

  res.redirect('/anilist');
}

function getExpiriationDate(authData: AuthData): Date {
  const decoded = jwt.decode(authData.access_token);

  if (decoded === null || typeof decoded === 'string' || !decoded.exp) {
    const date = new Date();
    date.setUTCFullYear(date.getUTCFullYear() + 1);

    return date;
  }

  return new Date(decoded.exp * 1000);
}
