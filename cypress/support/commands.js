/// <reference types="cypress"/>


Cypress.Commands.add('logIn', (email, password) => { 
    cy.visit('/')
    cy.contains('.flex', 'Zgadzam się').click()
    cy.contains('.flex', 'Zaloguj się').click()
    cy.get('[type="email"]').type(email)
    cy.get('[type="password"]').type(password)
    cy.get('form').submit()
 })

Cypress.Commands.add('logOut', () => { 
    cy.contains('.flex', 'Wyloguj się').click()
    cy.contains('.flex', 'Zaloguj się').should('exist')
})


Cypress.Commands.add('logInAPI', (username, password) => { 
    cy.request({
        method: 'POST',
        url: 'https://api-test.gluk.pl/v1/auth/login', 
        body: {
          email: username,
          password: password,
        },
      }).then((res) => {
        cy.setCookie('accessToken', res.body.accessToken)
        cy.visit('https://www.test.gluk.pl/') 
      }) 

      
      
  
})



