/// <reference types="cypress"/>
// @ts-check

import SignIn from '../../support/pages/Forms/SignIn/index';
import Toast from '../../support/components/Toast/index';
 
describe('Authentication Tests', () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/');
        SignIn.clearForm();
    });

    it('Should invalidate when empty inputs', () => {
        SignIn.submit();
        Toast.verifyMessage('Insira o seu e-mail');
        Toast.verifyMessage('Insira sua senha');
    });

    it('Should invalidate the invalid email address input', () => {
        SignIn.getPasswordInput().type('secret');
        SignIn.validationEmailInput();
    });

    it('Should invalidate the invalid password input', () => {
        SignIn.getEmailInput().type('luby@admin.com');
        SignIn.validationPasswordInput();
    });

    it('Should invalidate when user is unregistered', () => {
        cy.intercept('POST', '/login', {
            statusCode: 401,
            fixture: 'userError.json'
        }).as('post-loginError');

        SignIn.insertData('luby@admin.com', 'secret');
        SignIn.submit();

        cy.wait('@post-loginError')
        .its('response.body')
        .then((res) => {
            Toast.verifyMessage(res.message);
        }); 
    });

    it('Success Log In with e-mail and password', () => {
        cy.intercept('POST', '/login', {
           statusCode: 200,
           fixture: 'user.json'
        }).as('post-loginSuccess');


        SignIn.insertData('luby@admin.com', 'secret');
        SignIn.submit();

        cy.wait('@post-loginSuccess')
        .then(() => {
            Toast.verifyMessage('Seja Bem-Vindo');
            cy.url().should('equal', `${Cypress.config().baseUrl}/home`);
           
            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user'));
                const token = JSON.parse(win.localStorage.getItem('token'));

                expect(user).is.not.null;
                expect(user).to.have.any.keys('id', 'name', 'e-mail');

                expect(token).is.not.null;
                expect(token).to.have.any.keys('type', 'token', 'expires_at');
            });
        });
    });

   it('Auto authentication success with user token not expired', () => {
        cy.autoLogin('/sign-in');
        cy.get('[data-cy="loading"]').should('is.visible');
        cy.get('nav').should('is.visible');
        cy.url().should('equal', `${Cypress.config().baseUrl}/home`);
    });

    it('Auto authentication error becouse user token has expired', () => {
        cy.clock(new Date('2023-01-01'));        
        cy.autoLogin('/sign-in');
        cy.url().should('equal', `${Cypress.config().baseUrl}/sign-in`);
        SignIn.getEmailInput().should('is.visible');
        SignIn.getPasswordInput().should('is.visible');
    });
});