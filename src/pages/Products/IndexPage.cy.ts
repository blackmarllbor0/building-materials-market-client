import IndexPage from './IndexPage.vue'

describe('<IndexPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(IndexPage)
  })
})