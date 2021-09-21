import React from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import AboutScreen from '../src/components/screens/AbouScreen';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

function AboutPage({ messages }) {
  return (
    <AboutScreen messages={messages} />
  );
}

AboutPage.propTypes = AboutScreen.propTypes;

export default websitePageHOC(AboutPage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Sobre',
    },
    pageBoxProps: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      backgroundImage: 'url(/images/bubbles.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
    },
  },
});

export async function getStaticProps() {
  const TOKEN = process.env.NEXT_PUBLIC_DATOCMS_KEY;

  const DatoCMSURL = process.env.NEXT_PUBLIC_DATOCMS_URL;

  const client = new GraphQLClient(DatoCMSURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const query = gql`
    query {
      pageSobre(locale: pt_BR) {
        pageTitle
        pageDescription
      }
    }
  `;

  const messages = await client.request(query);

  return {
    props: {
      messages,
    },
  };
}
