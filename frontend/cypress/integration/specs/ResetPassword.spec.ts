/// <reference types="cypress"/>
// @ts-check

import Toast from '../../support/components/Toast/index';
import ResetPassword from '../../support/pages/Forms/ResetPassword/index';
import ChangePassword from '../../support/pages/Forms/ChangePassword/index';

describe('Reset Password Tests', () => {

    before(() => {
        cy.visit('/reset-password');
    });

    beforeEach(() => {
       cy.window().location()
       .then((loc) => {
            if(loc.pathname === '/reset-password') {
                ResetPassword.clearForm();
            } else {
                ChangePassword.clearForm();
            }
       });
    });

    it('Should invalidate when empty inputs', () => {
        ResetPassword.submit();
        Toast.verifyMessage('Insira o seu e-mail');
    });

    it('Should invalidate the invalid email address input', () => {
        ResetPassword.validationEmailInput();
    });

    it('Should invalidate when user is unregistered', () => {
        cy.intercept('POST', '/reset', {
            statusCode: 404,
            fixture: 'userNotFound.json'
        }).as('post-resetError');

        ResetPassword.insertData('luby@admin.com');
        ResetPassword.submit();

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

       ResetPassword.insertData('luby@admin.com');
       ResetPassword.submit();

       cy.wait('@post-resetSuccess').its('response.body').then((res) => {
            Toast.verifyMessage('Defina sua nova senha');
            cy.url().should('equal', `${Cypress.config().baseUrl}/reset-password/${res.token}`);
       });
    });

    it('Should invalidate the invalid password input', () => {
        ChangePassword.validationPasswordInput();
    });

    it('Should invalidate when password and password confirm are different', () => {
        ChangePassword.insertData('secret', '123456');
        ChangePassword.submit();
        Toast.verifyMessage('A confirmação de senha é diferente da senha escolhida');
    });

    it('Should change password user with success', () => {
       
    });
});