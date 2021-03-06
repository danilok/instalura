import HttpClient from '../../infra/http/HttpClient';
import isStagingEnv from '../../infra/env/isStagingEnv';
import authService from '../auth/authService';

const BASE_URL = isStagingEnv
  // Back End de DEV
  // ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  ? 'https://instalura-api.vercel.app'
  : 'https://instalura-api-git-master-omariosouto.vercel.app';
  // Back End de PROD

const postService = () => {
  const url = `${BASE_URL}/api/posts`;
  return {
    async setLike(
      id,
      authServiceModule = authService,
      HttpClienteModule = HttpClient,
    ) {
      const token = authServiceModule(null).getToken();
      const likeUrl = `${url}/${id}/like`;
      try {
        const response = await HttpClienteModule(likeUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      } catch (error) {
        throw new Error(`Erro ao dar like/dislike no post ${id}}`);
      }
    },
    async createPost(
      { photoUrl, description, filter },
      authServiceModule = authService,
      HttpClienteModule = HttpClient,
    ) {
      const token = authServiceModule(null).getToken();
      try {
        const response = await HttpClienteModule(url, {
          method: 'POST',
          body: {
            photoUrl,
            description,
            filter,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      } catch (error) {
        throw new Error('Não conseguimos pegar os posts');
      }
    },
  };
};

export default postService;
