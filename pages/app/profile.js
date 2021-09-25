/* eslint-disable @next/next/no-img-element */
import React from 'react';
import authService from '../../src/services/auth/authService';
import useUserService from '../../src/services/user/hook';
import userService from '../../src/services/user/userService';

export default function ProfilePage(props) {
  const dados = useUserService.getProfilePage();
  return (
    <div>
      Página de Profile!
      <br />
      <img src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif" alt="Nicolas Cage" />
      {dados.loading && 'Loading'}
      {!dados.loading && dados.data && (
        // 'Carregou os dados com sucesso'
        <pre>
          Props:
          <br />
          {JSON.stringify(props, null, 4)}
          <br />
          Service
          <br />
          {JSON.stringify(dados.data, null, 4)}
        </pre>
      )}
      {!dados.loading && dados.error}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const user = userService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await user.getProfilePage();
    return {
      props: {
        user: {
          ...session,
          ...profilePage.user,
        },
        posts: profilePage.posts,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login/' });
  ctx.res.end();

  return {
    props: {},
  };
}
