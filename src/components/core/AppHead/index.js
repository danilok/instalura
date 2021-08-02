import React from 'react';
import Head from 'next/head';

export default function AppHead() {
  return (
    <Head>
      <title>Instalura</title>
      <meta name="title" content="Instalura" />
      <meta name="description" content="Instalura - Compartilhe momentos e conecte-se com amigos" />
      <meta property="og:title" content="Instalura" key="title" />
      <meta property="og:description" content="Instalura - Compartilhe momentos e conecte-se com amigos" key="description" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://instalura-danilok.vercel.app" />
      <meta property="og:image" content="https://instalura-danilok.vercel.app/homepage.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}
