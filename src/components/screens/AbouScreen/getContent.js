import { CMSGraphQLClient, gql } from '../../../infra/cms/CMSGraphQLClient';

export default async function getContent() {
  const query = gql`
    query {
      pageSobre(locale: pt_BR) {
        pageTitle
        pageDescription
      }
    }
  `;

  const client = CMSGraphQLClient();

  const response = await client.query({ query });

  return response.data.messages;
}
