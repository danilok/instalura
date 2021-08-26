import React from 'react';
import WebsitePageWrapper from '../src/components/wrappers/WebsitePage';
import HomeScreen from '../src/components/screens/HomeScreen';

export default function Home() {
  return (
    <WebsitePageWrapper
      seoProps={{
        headTitle: 'Home',
      }}
      pageBoxProps={{
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundImage: 'url(/images/bubbles.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom right',
      }}
    >
      <HomeScreen />
    </WebsitePageWrapper>
  );
}
