/// <reference types="cypress"/>
// @ts-check

import Home from '../../support/pages/Home/index';

describe('Logout Tests', () => {
    it('Should logout with success', () => {
        cy.autoLogin('/sign-in');
        cy.url().should('equal', `${Cypress.config().baseUrl}/home`);

        Home.logout();

        cy.url().should('equal', `${Cypress.config().baseUrl}/sign-in`);
        cy.visit('/home');
        cy.url().should('equal', `${Cypress.config().baseUrl}/404`);
        cy.get('[data-cy="text-title"]').should('to.have.text', 'Page Not Found');

        cy.window().then((win) => {
            expect(win.localStorage.getItem('user')).to.be.null;
            expect(win.localStorage.getItem('token')).to.be.null;
        });
    });
});