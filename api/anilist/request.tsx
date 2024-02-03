export type AnilistAuth = {
  accessToken: string;
  refreshToken: string;
};

type Options = {
  auth?: AnilistAuth;
  method?: Method;
  body?: RequestInit['body'];
};

type GraphQLBody = {
  variables?: Record<string, string | number>;
  query: string;
  auth?: AnilistAuth;
};

type OptionsGraphQL = GraphQLBody & {};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function request<T>(url: string, options?: Options): Promise<T> {
  const response = await fetch(url, {
    method: options?.method ?? 'GET',
    headers: buildHeaders(options?.auth),
    body: options?.body,
  });

  return (await response.json()) as T;
}

export function requestGraphQL<T>(options: OptionsGraphQL): Promise<T> {
  return request<T>(process.env.NEXT_PUBLIC_ANILIST_URL ?? '', {
    method: 'POST',
    auth: options.auth,
    body: JSON.stringify(buildBody(options)),
  });
}

function buildHeaders(auth?: AnilistAuth): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (auth) {
    headers.Authorization = `Bearer ${auth.accessToken}`;
  }

  return headers;
}

function buildBody(options: OptionsGraphQL): GraphQLBody {
  const body: GraphQLBody = {
    query: options.query,
  };

  if (options.variables) {
    body.variables = options.variables;
  }

  return body;
}
