// @ts-ignore
describe('template spec', () => {
  it('passes', async () => {
    cy.visit('http://localhost:3000/products');

    cy.visit('http://localhost:3000/register');

    // cy.get('.name')
    //   .type('Vladimir Putin');

    cy.get('.email')
      .type('putin@russia.ru');

    cy.get('.phone-number')
      .type('(999) 777 77 77');

    cy.get('.password')
      .type('Put1n_Vl4d1m1r');

    cy.get('.name')
      .type('Vladimir Putin', { force: true });

    cy.get('.register-btn').click();

    cy.wait(1000 * 4);

    cy.get('.password')
      .type('Put1n_Vl4d1m1r');

    cy.get('.login-bnt').click();
  });
});
