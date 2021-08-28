import React from 'react';
import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQQuestionPage({ category, question }) {
  return (
    <FAQQuestionScreen
      question={question}
      category={category}
    />
  );
}

FAQQuestionPage.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQQuestionPage);

export async function getStaticProps({ params }) {
  try {
    const res = await fetch('https://instalura-api.vercel.app/api/content/faq');
    const jsonRes = await res.json();
    const faqCategories = jsonRes.data;

    const dadosDaPagina = faqCategories.reduce((valorAcumulado, faqCategory) => {
      const foundQuestion = faqCategory.questions.find((question) => question.slug === params.slug);

      if (foundQuestion) {
        return {
          ...valorAcumulado,
          category: faqCategory,
          question: foundQuestion,
        };
      }

      return valorAcumulado;
    }, {});

    return {
      props: {
        category: dadosDaPagina.category,
        question: dadosDaPagina.question,
        pageWrapperProps: {
          seoProps: {
            headTitle: dadosDaPagina.question.title,
          },
          pageBoxProps: {
            justifyContent: 'space-between',
          },
        },
      },
    };
  } catch (error) {
    return {
      props: {
        category: {
          title: '',
          questions: [],
        },
        question: {
          title: '',
          description: '',
        },
      },
    };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch('https://instalura-api.vercel.app/api/content/faq');
    const jsonRes = await res.json();
    const faqCategories = jsonRes.data;

    const paths = faqCategories.reduce((valorAcumulado, faqCategory) => {
      const questionsPaths = faqCategory.questions.map((question) => (
        { params: { slug: question.slug } }));

      return [
        ...valorAcumulado,
        ...questionsPaths,
      ];
    }, []);

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
}
