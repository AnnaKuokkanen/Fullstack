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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'anna', password: 'password' })
      cy.createBlog({ title: 'some title', author: 'some author', url: 'someurl.com' })
      cy.createBlog({ title: 'another title', author: 'another author', url: 'anotherurl.com' })
      cy.login({ username: 'anna', password: 'password' })
    })

    it('Blog can be added', () => {
      cy.get('#add-blog-button').click()

      cy.get('#title').type('New Blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('url.com')
      cy.get('#create-blog-button').click()

      cy.contains('New Blog by Author')
    })

    it('User can like blog', () => {
      cy.contains('some title by some author').parent().find('#view-blog-button').click()
      cy.contains('some title by some author').parent().find('#like-blog-button').click()
      cy.contains('some title by some author').parent().contains('likes 1')
    })

    it.only('User can delete a blog', () => {
      cy.contains('some title by some author').parent().find('#view-blog-button').click()
      cy.contains('some title by some author').parent().find('#remove-blog-button').click()

      cy.contains('some title by some author').contains('#view-blog-button').should('not.exist')
    })
  })
})