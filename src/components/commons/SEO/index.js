import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function SEO({ headTitle }) {
  const hasHeadTitle = Boolean(headTitle);
  const baseTitle = 'Instalura - Projeto Base do Alura Bootcamp JAMStack';
  const title = hasHeadTitle
    ? (`${headTitle} | ${baseTitle}`)
    : baseTitle;
  const description = 'Instalura - Compartilhe momentos e conecte-se com amigos';
  const image = 'https://instalura-danilok.vercel.app/homepage.png';
  const urlBase = 'https://instalura-danilok.vercel.app';

  return (
    <Head>
      <title>{title}</title>
      {/* <!-- Primary Meta Tags --> */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={urlBase} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={urlBase} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
}

SEO.propTypes = {
  headTitle: PropTypes.string,
};

SEO.defaultProps = {
  headTitle: '',
};
