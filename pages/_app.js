/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AppHead from '../src/components/core/AppHead';

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <AppHead />

      <Component {...pageProps} />
    </>
  );
}
