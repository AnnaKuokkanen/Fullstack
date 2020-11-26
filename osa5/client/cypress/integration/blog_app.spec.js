describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    const user = {
      name: 'Anna',
      username: 'anna',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#usernameField').should('exist')
    cy.get('#passwordField').should('exist')
  })

  describe('Login', function() {
    it('Succeeds with correct credentials', () => {
      cy.get('#usernameField').type('anna')
      cy.get('#passwordField').type('password')
      cy.get('#login-button').click()

      cy.contains('Anna logged in')
    })
    
    it('Does not succeed with incorrect credentials', () => {
      cy.get('#usernameField').type('someone')
      cy.get('#passwordField').type('something')
      cy.get('#login-button').click()

      cy.get('#login-button').should('exist')
    })
  })
})