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
      <meta property="og:image" content="https://instalura-danilok.vercel.app/homepage.png"></meta>
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
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}