import { setCookie, destroyCookie } from 'nookies';
import isStagingEnv from '../../infra/env/isStagingEnv';
import HttpClient from '../../infra/http/HttpClient';

const BASE_URL = isStagingEnv
  // Back End de DEV
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  // Back End de PROD
  : 'https://instalura-api-git-master-omariosouto.vercel.app';
  // : 'https://instalura-api.omariosouto.vercel.app';

export const LOGIN_APP_TOKEN_APP = 'LOGIN_APP_TOKEN_APP';

const loginService = {
  async login(
    { username, password },
    setCookieModule = setCookie,
    HttpClienteModule = HttpClient,
  ) {
    return HttpClienteModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then((respostaConvertida) => {
        const { token } = respostaConvertida.data;
        const hasToken = token;
        if (!hasToken) {
          throw new Error('Failed to login');
        }

        const DAY_IN_SECONDS = 86400;

        setCookieModule(null, LOGIN_APP_TOKEN_APP, token, {
          path: '/',
          maxAge: DAY_IN_SECONDS * 7,
        });

        return {
          token,
        };
      });
  },
  async logout(ctx, destroyCookieModule = destroyCookie) {
    destroyCookieModule(ctx, LOGIN_APP_TOKEN_APP, { path: '/' });
  },
};

export default loginService;
