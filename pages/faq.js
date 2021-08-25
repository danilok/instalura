import React from 'react';
import FAQScreen from '../src/components/screens/FAQScreen';

export default function FaqPage(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FAQScreen {...props} />
  );
}

export async function getStaticProps() {
  const res = await fetch('https://instalura-api.vercel.app/api/content/faq');
  const jsonRes = await res.json();
  const faqCategories = jsonRes.data;

  return {
    props: {
      faqCategories,
    },
  };
}
