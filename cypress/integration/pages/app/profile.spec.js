/// <reference types="cypress" />

import ProfileScreenPageObject from '../../../../src/components/screens/app/ProfileScreen/ProfileScreen.pageObject';
import { LOGIN_APP_TOKEN_APP } from '../../../../src/services/login/loginService';

describe('/pages/app/profile', () => {
  before(() => {
    cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app/api/login')
      .as('userLogin');

    const authData = { username: 'asdfasdf', password: 'senhasegura' };

    // programmatically log us in without needing the UI
    cy.request('POST', 'https://instalura-api-git-master-omariosouto.vercel.app/api/login', {
      username: authData.username,
      password: authData.password,
    })
      .its('body')
      .as('currentUser');

    cy.get('@currentUser')
      .then((response) => {
        cy.setCookie(LOGIN_APP_TOKEN_APP, response.data.token);
      });
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: LOGIN_APP_TOKEN_APP,
    });
  });

  // it === test que estamos fazendo
  describe('when logged in and clicked on image modal', () => {
    it('fill the form and create a post', () => {
      // cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app/api/posts')
      cy.intercept('https://instalura-api.vercel.app/api/posts')
        .as('createPost');

      cy.getCookie(LOGIN_APP_TOKEN_APP).should('exist');

      // const post = {
      //   url: 'https://sm.ign.com/ign_br/screenshot/default/025pikachu-os-anime-4_3pym.png',
      //   filter: '1977',
      // };

      const post = {
        url: 'https://picsum.photos/seed/picsum/375/375',
        filter: 'toaster',
      };

      // Cenário
      const profileScreen = new ProfileScreenPageObject(cy);

      profileScreen
        .openModal()
        .fillFormImagem(post)
        .nextStepFormImagem()
        .clickFilter(post)
        .submitFormImagem()
        .closeModal();

      // Asserções
      cy.url().should('include', '/app/profile');

      cy.wait('@createPost')
        .then((intercepted) => {
          const { photoUrl, _id, filter } = intercepted.response.body.data;
          cy.get(`#${_id}`)
            .should('exist')
            .within(() => {
              cy.get('figure')
                .should('have.class', `filter-${filter}`);
              cy.get('img')
                .should('have.attr', 'src')
                .should('eq', photoUrl);
            });
        });
    });
  });
});
