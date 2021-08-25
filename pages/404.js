import React from 'react';
import { Lottie } from '@crello/react-lottie';
import Box from '../src/components/foundation/layout/Box';

export default function Page404() {
  const animation404 = 'https://assets9.lottiefiles.com/packages/lf20_aaesnvcw.json';
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Lottie
        width="100vw"
        height="100vh"
        config={{ path: animation404, loop: true, autoplay: true }}
      />
    </Box>
  );
}
