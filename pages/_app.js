/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/theme';
import GlobalStyle from '../src/theme/GlobalStyle';

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
