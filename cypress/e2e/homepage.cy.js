/// <reference types="cypress"/>

describe('Home Page', () => {

it('should redirect to category page', () => {
    cy.visit('/')
    cy.contains('.flex', 'Zgadzam się').click()
    cy.get('a[href="/kategoria/osobowe"]').click()
    cy.url().should('contain', 'kategoria/osobowe')
    cy.get('a[href="/kategoria/dostawcze"]').click()
    cy.url().should('contain', 'kategoria/dostawcze')
    cy.get('a[href="/kategoria/kampery"]').click()
    cy.url().should('contain', 'kategoria/kampery')
    cy.get('a[href="/kategoria/sprzet-ciezki"]').click()
    cy.url().should('contain', 'kategoria/sprzet-ciezki')
    cy.get('a[href="/kategoria/okolicznosciowe"]').click()
    cy.url().should('contain', 'kategoria/okolicznosciowe')
    cy.get('.p-2').contains('Inne').click()
    cy.get('.mr-4').contains('Motocykle').click()
    cy.url().should('contain', 'kategoria/motocykle')
})




})