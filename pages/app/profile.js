/* eslint-disable @next/next/no-img-element */
import React from 'react';
import authService from '../../src/services/auth/authService';

export default function ProfilePage(props) {
  return (
    <div>
      Página de Profile!
      <pre>
        {JSON.stringify(props, null, 4)}
      </pre>
      <img src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif" alt="Nicolas Cage" />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    return {
      props: {
        user: session,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login/' });
  ctx.res.end();

  return {
    props: {},
  };
}
