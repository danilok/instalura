import React from 'react';
import WebsitePageWrapper from '../src/components/wrappers/WebsitePage';
import HomeScreen from '../src/components/screens/HomeScreen';

export default function Home() {
  return (
    <WebsitePageWrapper>
      <HomeScreen />
    </WebsitePageWrapper>
  );
}
