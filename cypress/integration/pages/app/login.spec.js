/// <reference types="cypress" />

describe('/pages/app/login', () => {
  // it === test que estamos fazendo
  it('preencha os campos e vá para a página /app/profile', () => {
    cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app/api/login')
      .as('userLogin');

    // visitar a pagina de login
    cy.visit('/app/login');
    // preencher o input de usuario
    // document.querySelector('input[name="usuario"]')
    cy.get('#formCadastro input[name="usuario"]').type('omariosouto');
    // preencher o input de senha
    cy.get('#formCadastro input[name="senha"]').type('senhasegura');
    // clicar no botão para entrar
    cy.get('#formCadastro button[type="submit"]').click();
    // o que esperamos? ir para "app/profile/"
    cy.url().should('include', '/app/profile');
    // aguardar requisição da api
    cy.wait('@userLogin')
      .then((intercepted) => {
        // Token do servidor
        const { token } = intercepted.response.body.data;

        cy.getCookie('APP_TOKEN')
          .should('exist')
          // token do cookie é igual ao do servidor?
          .should('have.a.property', 'value', token);
      });
  });
});
