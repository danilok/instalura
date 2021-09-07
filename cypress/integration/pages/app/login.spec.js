/// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.pageObject';

describe('/pages/app/login', () => {
  // it === test que estamos fazendo
  describe('when fill and submit a form login request', () => {
    it('go to the profile page', () => {
      // Pré-teste
      cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app/api/login')
        .as('userLogin');

      // Cenário
      const loginScreen = new LoginScreenPageObject(cy);

      loginScreen
        .fillLoginForm({ username: 'omariosouto', password: 'senhasegura' })
        .submitLoginForm();

      // Asserções
      cy.url().should('include', '/app/profile');
      cy.wait('@userLogin')
        .then((intercepted) => {
          const { token } = intercepted.response.body.data;
          cy.getCookie('APP_TOKEN')
            .should('exist')
            .should('have.a.property', 'value', token);
        });
    });
  });
});
