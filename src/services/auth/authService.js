import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import loginService, { LOGIN_APP_TOKEN_APP } from '../login/loginService';
import HttpClient from '../../infra/http/HttpClient';
import isStagingEnv from '../../infra/env/isStagingEnv';

const BASE_URL = isStagingEnv
  // Back End de DEV
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  // Back End de PROD
  : 'https://instalura-api-git-master-omariosouto.vercel.app';
  // : 'https://instalura-api.omariosouto.vercel.app';

const authService = (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies[LOGIN_APP_TOKEN_APP];
  const session = jwt.decode(token);

  return {
    getToken() {
      return token;
    },
    async hasActiveSession() {
      return HttpClient(`${BASE_URL}/api/auth`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data }) => {
          if (data.authenticated) {
            return true;
          }
          loginService.logout(ctx);
          return false;
        })
        .catch(() => {
          loginService.logout(ctx);
          return false;
        });
    },
    async getSession() {
      return session.user;
    },
  };
};

export default authService;
