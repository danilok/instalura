/* eslint-disable @next/next/no-img-element */
import React from 'react';
import authService from '../../src/services/auth/authService';
import userService from '../../src/services/user/userService';
import LoggedPageHOC from '../../src/components/wrappers/LoggedPage/hoc';
import ProfileScreen from '../../src/components/screens/app/ProfileScreen';

function ProfilePage(props) {
  return (
    <ProfileScreen profileProps={props} />
  );
}

export default LoggedPageHOC(ProfilePage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Perfil',
    },
    pageBoxProps: {
      backgroundColor: '#E5E5E5',
    },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const user = userService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  const getRandomIntInclusive = (begin, end) => {
    const min = Math.ceil(begin);
    const max = Math.floor(end);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const followers = getRandomIntInclusive(0, 50000);
  const following = getRandomIntInclusive(0, 50000);

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await user.getProfilePage();
    const posts = profilePage.posts && profilePage.posts.length > 0
      // ? profilePage.posts.slice(0, 25)
      ? profilePage.posts
      : [];
    return {
      props: {
        user: {
          ...session,
          ...profilePage.user,
          followers,
          following,
        },
        posts,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login/' });
  ctx.res.end();

  return {
    props: {},
  };
}
