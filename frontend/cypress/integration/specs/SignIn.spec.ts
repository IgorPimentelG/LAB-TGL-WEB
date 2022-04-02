/// <reference types="cypress"/>
// @ts-check

import SignIn from '../../support/pages/Forms/SignIn';
import Toast from '../../support/components/Toast';

describe('Authentication Tests', () => {

    before(() => {
        cy.visit('/');
    });

    beforeEach(() => {
        SignIn.clearForm();
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
        SignIn.insertData('luby@admin.com', '<html> </html>');
        SignIn.logIn();
        Toast.verifyMessage('É Permitido somente caracteres alfanuméricos e símbolos [-, #, @, +, =]');
    });

    it('Should invalidate the unregistered user', () => {

    });

    it('Success Log In', () => {

    });
});