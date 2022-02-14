export default class ProfileScreenPageObject {
  constructor(cy) {
    this.cy = cy;

    // visitar a pagina do perfil
    this.cy.visit('/app/profile');
  }

  openModal() {
    this.cy.get('#h-add > button').click();
    return this;
  }

  fillFormImagem({ url }) {
    this.cy.get('#formImagem input[name="url"]').type(url);
    return this;
  }

  nextStepFormImagem() {
    this.cy.get('#formImagem button[type="button"]').click();
    return this;
  }

  clickFilter({ filter }) {
    this.cy.get(`li[data-filter="${filter}"]`).click();
    return this;
  }

  submitFormImagem() {
    this.cy.get('#formImagem button[type="submit"]').click();
    return this;
  }

  closeModal() {
    this.cy.get('#close-form-imagem').click();
    return this;
  }
}
