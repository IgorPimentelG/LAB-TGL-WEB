/// <reference types="cypress"/>
// @ts-check

import ResetPassword from '../../support/pages/Forms/ResetPassword/index';
import Toast from '../../support/components/Toast/index';

describe('Reset Password Tests', () => {

    before(() => {
        cy.visit('/reset-password');
    });

    beforeEach(() => {
       cy.window().location()
       .then((loc) => {
           console.log(loc.pathname);
            if(loc.pathname === '/reset-password') {
                ResetPassword.clearEmailForm();
            } else {
                ResetPassword.clearPasswordForm();
            }
       });
    });

    it('Should invalidate when empty inputs', () => {
        ResetPassword.sendLink();
        Toast.verifyMessage('Insira o seu e-mail');
    });

    it('Should invalidate the invalid email address input', () => {
        ResetPassword.insertEmail('luby@');
        ResetPassword.sendLink();
        Toast.verifyMessage('Insira um e-mail válido');

        ResetPassword.clearEmailForm();

        ResetPassword.insertEmail('  ');
        ResetPassword.sendLink();
        Toast.verifyMessage('Insira um e-mail válido');
    });

    it('Should invalidate when user is unregistered', () => {
        cy.intercept('POST', '/reset', {
            statusCode: 404,
            fixture: 'userNotFound.json'
        }).as('post-resetError');

        ResetPassword.insertEmail('luby@admin.com');
        ResetPassword.sendLink();

        cy.wait('@post-resetError').its('response.body')
        .then((res) => {
            Toast.verifyMessage(res.message);
        });
    });

    it('Should send link with success', () => {
       cy.intercept('POST', '/reset', {
           statusCode: 200,
           fixture: 'reset.json'
       }).as('post-resetSuccess');

       ResetPassword.insertEmail('luby@admin.com');
       ResetPassword.sendLink();

       cy.wait('@post-resetSuccess').its('response.body').then((res) => {
            Toast.verifyMessage('Defina sua nova senha');
            cy.url().should('equal', `${Cypress.config().baseUrl}/reset-password/${res.token}`);
            ResetPassword.getPasswordInput().should('is.visible');
            ResetPassword.getPasswordConfirmInput().should('is.visible');
       });
    });

    it('Should invalidate the invalid password input', () => {
        ResetPassword.insertPassword('sec', 'sec');
        ResetPassword.confirmChangePassword();
    });

    it('Should invalidate when password and password confirm are different', () => {
        ResetPassword.insertPassword('secret', '123456');
        ResetPassword.confirmChangePassword();
        Toast.verifyMessage('A confirmação de senha é diferente da senha escolhida');
    });

});