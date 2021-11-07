/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PostScreen from '../../../src/components/screens/app/PostScreen';
import LoggedPageHOC from '../../../src/components/wrappers/LoggedPage/hoc';
import authService from '../../../src/services/auth/authService';

function PostPage(props) {
  return (
    <PostScreen postProps={props} />
  );
}

export default LoggedPageHOC(PostPage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Post',
    },
    pageBoxProps: {
      backgroundColor: '#E5E5E5',
    },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    try {
      const res = await fetch(`https://instalura-api.vercel.app/api/posts/${ctx.query.post}`);
      const jsonRes = await res.json();
      const post = jsonRes.data[0];
      return {
        props: {
          user: {
            ...session,
          },
          post,
          posts: [],
        },
      };
    } catch (error) {
      return {
        props: {},
      };
    }
  }

  ctx.res.writeHead(307, { location: '/login/' });
  ctx.res.end();

  return {
    props: {},
  };
}
