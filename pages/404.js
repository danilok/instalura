import React from 'react';
import { Lottie } from '@crello/react-lottie';
import Box from '../src/components/foundation/layout/Box';
import Button from '../src/components/commons/Button';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

function NotFoundPage() {
  const animation404 = 'https://assets9.lottiefiles.com/packages/lf20_aaesnvcw.json';
  return (
    <Box
      display="flex"
      flex="1"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Lottie
        width="95vw"
        height="75vh"
        config={{ path: animation404, loop: true, autoplay: true }}
      />
      <Button
        variant="primary.main"
        href="/"
      >
        Voltar para Home
      </Button>
    </Box>
  );
}

export default websitePageHOC(NotFoundPage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Página não encontrada',
    },
    menuProps: {
      display: false,
    },
  },
});
