/// <reference types="cypress"/>
// @ts-check

import Toast from '../../support/components/Toast/index';
import SignUp from '../../support/pages/Forms/SignUp/index';

describe('User Registration Tests', () => {

    before(() => {
        cy.visit('/');
        cy.get('[data-cy="button-signup"]').click();
        Cypress.env('toast');
    });

    beforeEach(() => {
        SignUp.clearForm();
    });

    it('Should invalidate when empty inputs', () => {
        SignUp.submit();
        Toast.verifyMessage('Informe o seu nome');
        Toast.verifyMessage('Insira sua senha');
        Toast.verifyMessage('Insira o seu e-mail');
    });

    it('Should invalidate the name input', () => {   
        SignUp.getEmailInput().type('luby@admin.com');
        SignUp.getPasswordInput().type('secret');
        SignUp.validationNameInput();
    });

    it('Should invalidate the invalid email address input', () => {
       SignUp.getNameInput().type('Luby');
       SignUp.getPasswordInput().type('secret');
       SignUp.validationEmailInput();
    });

    it('Should invalidate the invalid password input', () => {
        SignUp.getNameInput().type('Luby');
        SignUp.getEmailInput().type('luby@admin.com');
        SignUp.validationPasswordInput();
    });

    it('Should invalidate the E-mail address already exists', () => {
        cy.intercept('POST', '/user/create', (req) => {
            req.continue((res) => {
                res.send({ fixture: 'emailError.json' });
            });
        }).as('post-createUserError');

        SignUp.insertData('Lab Luby', 'luby@admin.com', 'secret');
        SignUp.submit();
       
        cy.wait('@post-createUserError')
        .its('response.body')
        .then(() => {
            cy.wait(100);
            Toast.verifyMessage('Email already exists');
        });

        cy.url().should('equal', `${Cypress.config().baseUrl}/sign-up`);
    });

    it('Should register a new user with success', () => {
        cy.intercept('POST', '/user/create', (req) => {
            req.continue((res) => {
                res.send(200, { fixture: 'user.json'});
            });
        }).as('post-createUserSuccess');

        SignUp.insertData('LabLuby', 'luby@admin.com', '_123456');
        SignUp.submit();

        cy.wait('@post-createUserSuccess')
        .its('response.body')
        .then(() => {
            Toast.verifyMessage('Conta criada com sucesso');
            cy.url().should('equal', `${Cypress.config().baseUrl}/sign-in`);
        });
    });
});