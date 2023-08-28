/// <reference types="cypress"/>


describe('Authorization', () => {

  it('should log in by form', () => {
    cy.logIn(Cypress.env("username"), Cypress.env("password"))
    cy.contains('.flex', 'Wyloguj się').should('be.visible')
    cy.getCookie('accessToken').should('exist')
  })

  it('should log out after succesfull log in', () => {
    cy.logIn(Cypress.env("username"), Cypress.env("password"))
    cy.contains('.flex', 'Wyloguj się').should('be.visible')
    cy.logOut()
  })

  it('should log in bypassing the UI', () => {
    cy.logInAPI(Cypress.env("username"), Cypress.env("password"))
    cy.contains('.flex', 'Zgadzam się').click()
    cy.contains('.flex', 'Wyloguj się').should('exist')
  })

  it('should redirect unauthorized user to log in form', () => {
    cy.visit('profil')
    cy.url().should('equal', 'https://www.test.gluk.pl/logowanie')
  })

  it('should not login with invalid username', () => {
    cy.logIn("invalidusername@test.pl", Cypress.env("password"))
    cy.get('.error-label')
    .should('be.visible')
    .and('contain', 'Podałeś błędny login lub hasło')
  })

  it('should not login with invalid password', () => {
    cy.logIn(Cypress.env("username"), 'invalidpassword')
    cy.get('.error-label')
    .should('be.visible')
    .and('contain', 'Podałeś błędny login lub hasło')
  })

  it('should display error if email is incorrect', () => {
    cy.logIn('test', Cypress.env("password"))
    cy.get('.error-label')
    .should('be.visible')
    .and('contain', 'Wprowadź poprawny adres email.')
  }) 

  it('should display error if password is too short', () => {
    cy.logIn(Cypress.env("username"), 'test')
    cy.get('.error-label')
    .should('be.visible')
    .and('contain', 'Wprowadź minimum 6 znaków.')
  })

  it('should show registration form', () => {
    cy.visit('/')
    cy.contains('.flex', 'Zgadzam się').click()
    cy.contains('.flex', 'Zaloguj się').click()
    cy.get('.flex').contains('Załóż konto').click()
    cy.get('h2.center').contains('Zarejestruj się').should('exist')
    cy.get('p.font-light').contains('Zarejestruj się aby mieć możliwość dodawania ogłoszeń').should('exist')
  })

  it('should show password reset form', () => {
    cy.visit('/')
    cy.contains('.flex', 'Zgadzam się').click()
    cy.contains('.flex', 'Zaloguj się').click()
    cy.get('.flex').contains('Nie pamiętam hasła').click()
    cy.get('h2.center').contains('Resetuj hasło')
    .should('exist')
    .and('be.visible')
    cy.get('p.font-light').contains('Wpisz e-mail, na który wyślemy instrukcję wygenerowania nowego hasła.')
    .should('exist')
    .and('be.visible')
  })

  it('should display information that the email to reset password has been sent', () => {
    cy.visit('/')
    cy.contains('.flex', 'Zgadzam się').click()
    cy.contains('.flex', 'Zaloguj się').click()
    cy.get('.flex').contains('Nie pamiętam hasła').click()
    cy.wait(3000)
    cy.get('[type="email"]').type(Cypress.env("username")).invoke("prop", "value").should('equal', Cypress.env("username"))
    cy.get('[type="submit"]').find('.flex').contains('Resetuj hasło').click()
    cy.get('.mt-8').should('contain', 'Instrukcja wygenerowania nowego hasła została wysłana na podany adres e-mail.')
  })

  it('should return to the login form', () => {
    cy.visit('/')
    cy.contains('.flex', 'Zgadzam się').click()
    cy.contains('.flex', 'Zaloguj się').click()
    cy.get('.flex').contains('Nie pamiętam hasła').click()
    cy.get('h2.center').contains('Resetuj hasło')
    .should('exist')
    .and('be.visible')
    cy.get('.inline-flex').contains('Wróć do strony logowania')
    .should('exist')
    .and('be.visible')
    .click()
    cy.get('.font-light').contains('Zaloguj się żeby mieć możliwość dodawania ogłoszeń')
    .should('exist')
    .and('be.visible')
  })


  it('should create new user', () => {
    cy.visit('/')
    cy.contains('.flex', 'Zgadzam się').click()
    cy.contains('.flex', 'Zaloguj się').click()
    cy.contains('.flex', 'Załóż konto').click()
    cy.wait(3000)
    cy.get('[type="email"]').type('testowyuser2@test.pl')
    cy.get('[type="password"]').eq(0).type('password2')
    cy.get('[type="password"]').eq(1).type('password2')
    cy.get('.ml-3').contains('Akceptuję regulamin').parent().find('[type="checkbox"]').check({force: true})
    cy.wait(3000)
    cy.get('.transition ').contains('Zarejestruj się').click()
    cy.get('[type="email"]').type('testowyuser1@test.pl')
    cy.get('[type="password"]').type('password2')
    cy.get('form').submit()
    cy.contains('.flex', 'Wyloguj się').should('be.visible')
    cy.getCookie('accessToken').should('exist')
    
  }) 

  
})