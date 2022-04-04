/// <reference types="cypress"/>
// @ts-check

import SignIn from '../../support/pages/Forms/SignIn/index';
import Toast from '../../support/components/Toast/index';
 
describe('Authentication Tests', () => {

    beforeEach(() => {
        cy.visit('/');
        SignIn.clearForm();
        cy.clearLocalStorage();
    });

    it('Should invalidate the empty inputs', () => {
        SignIn.logIn();
        Toast.verifyMessage('Insira o seu e-mail');
        Toast.verifyMessage('Insira sua senha');
    });

    it('Should invalidate the e-mail input', () => {
        SignIn.insertData('@mail', '123456');
        SignIn.logIn();
        Toast.verifyMessage('Insira um e-mail válido');
    });

    it('Should invalidate the password input', () => {
        SignIn.insertData('luby@admin.com', '    ');
        SignIn.logIn();
        Toast.verifyMessage('Insira sua senha');
    });

    it('Should invalidate the unregistered user', () => {
        cy.intercept('POST', '/login', {
            statusCode: 401,
            fixture: 'userError.json'
        }).as('post-loginError');

        SignIn.insertData('luby@admin.com', 'secret');
        SignIn.logIn();

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
        SignIn.logIn();

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