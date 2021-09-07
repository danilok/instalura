export default class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;

    // visitar a pagina de login
    this.cy.visit('/app/login');
  }

  fillLoginForm({ username, password }) {
    this.cy.get('#formCadastro input[name="usuario"]').type(username);
    this.cy.get('#formCadastro input[name="senha"]').type(password);
    return this;
  }

  submitLoginForm() {
    this.cy.get('#formCadastro button[type="submit"]').click();
    return this;
  }
}
