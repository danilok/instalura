import postService from './postService';

const token = 'fake-token';
const id = '618af67ea462c90009a0344c';
const post = {
  photoUrl: 'someusername',
  description: 'somepassword',
  filter: 'somefilter',
};
async function HttpClientModule() {
  return {
    data: post,
  };
}
async function HttpClientLikeModule() {
  return {
    data: {
      ...post,
      id,
    },
  };
}
const getToken = jest.fn();
getToken.mockImplementation(() => token);
const authServiceModule = () => ({
  getToken,
});

describe('postService()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when user send a request for post creation', () => {
    describe('and it succeeds', () => {
      test('get a response that matches sent body', async () => {
        const postSrv = postService();
        const postServiceResponse = await postSrv.createPost(
          post,
          authServiceModule,
          HttpClientModule,
        );

        expect(getToken).toBeCalledTimes(1);
        expect(postServiceResponse.data).toEqual(post);
      });
    });
  });
  describe('when user send a request for like a post', () => {
    describe('and it succeeds', () => {
      test('get a response that matches sent body', async () => {
        const postSrv = postService();
        const postServiceResponse = await postSrv.setLike(
          id,
          authServiceModule,
          HttpClientLikeModule,
        );

        expect(getToken).toBeCalledTimes(1);
        expect(postServiceResponse.data).toEqual({ id, ...post });
      });
    });
  });
});
