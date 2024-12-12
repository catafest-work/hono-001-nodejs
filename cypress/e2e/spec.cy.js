describe('template spec', () => {
  it('should display Hello Hono', () => {
    cy.request('http://localhost:3000')
        .its('body')
        .should('contain', 'Hello Hono!')
  })
})

describe('Hono Test', () => {
  it('should display Hello Hono', () => {
    // Direct URL approach matching your browser test
    cy.visit('http://localhost:3000', {
      // Adding headers to match browser behavior
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    })

    // Assert the text is present
    cy.get('body').should('contain', 'Hello Hono!')
  })
})
