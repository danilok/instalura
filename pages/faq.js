import FAQScreen from '../src/components/screens/FAQScreen';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

export default websitePageHOC(FAQScreen, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Perguntas Frequentes',
    },
  },
});

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
