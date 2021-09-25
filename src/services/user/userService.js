import HttpClient from '../../infra/http/HttpClient';
import isStagingEnv from '../../infra/env/isStagingEnv';
import authService from '../auth/authService';

const BASE_URL = isStagingEnv
  // Back End de DEV
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  // Back End de PROD
  : 'https://instalura-api-git-master-omariosouto.vercel.app';
  // : 'https://instalura-api.omariosouto.vercel.app';

const userService = (ctx) => {
  const url = `${BASE_URL}/api/users/posts`;
  return {
    async getProfilePage() {
      const token = authService(ctx).getToken();
      try {
        const response = await HttpClient(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return {
          user: {
            totalLikes: 100,
          },
          posts: response.data,
        };
      } catch (error) {
        throw new Error('Não conseguimos pegar os posts');
      }
    },
  };
};

export default userService;
