/* eslint-disable @next/next/no-img-element */
import React from 'react';
import LoggedHomeScreen from '../../src/components/screens/app/LoggedHomeScreen';
import LoggedPageHOC from '../../src/components/wrappers/LoggedPage/hoc';
import authService from '../../src/services/auth/authService';

function HomePage() {
  return (
    <LoggedHomeScreen />
  );
}

export default LoggedPageHOC(HomePage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Home',
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
    const home = [];
    return {
      props: {
        user: {
          ...session,
        },
        home,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login/' });
  ctx.res.end();

  return {
    props: {},
  };
}
