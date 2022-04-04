/// <reference types="cypress"/>
// @ts-check

const SignUp = require('../../support/pages/Forms/SignUp/index');
const Toast = require('../../support/components/Toast/index');

describe('User Registration Tests', () => {

    before(() => {
        cy.visit('/');
        cy.get('[data-cy="button-signup"]').click();
        Cypress.env('toast');
    });

    beforeEach(() => {
        SignUp.clearForm();
    });

    it('Should invalidate the empty inputs', () => {
        SignUp.register();
        Toast.verifyMessage('Informe o seu nome');
        Toast.verifyMessage('Insira sua senha');
        Toast.verifyMessage('Insira o seu e-mail');
    });

    it('Should invalidate the name input', () => {   
        const email = 'labluby@email.com';
        const password = 'secret';
        
        SignUp.insertData('     ', email, password);
        SignUp.register();
        Toast.verifyMessage('Informe o seu nome');

        SignUp.clearForm();
        SignUp.insertData('Lab Luby 1', email, password);
        SignUp.register();
        Toast.verifyMessage('Nome inválido');

        SignUp.clearForm();
        SignUp.insertData('La', email, password);
        SignUp.register();
        Toast.verifyMessage('Nome muito curto');
    });

    it('Should invalidate the e-mail input', () => {
        SignUp.insertData('LabLuby', 'luby@com', 'secret');
        SignUp.register();
        Toast.verifyMessage('Insira um e-mail válido');

        SignUp.clearForm();

        SignUp.insertData('LabLuby', '       ', 'secret');
        SignUp.register();
        Toast.verifyMessage('Insira um e-mail válido');
    });

    it('Should invalidate the password input', () => {
        const name = 'LabLuby';
        const email = 'labluby@email.com';

        SignUp.insertData(name, email, '          ');
        SignUp.register();
        Toast.verifyMessage('Insira sua senha');

        SignUp.clearForm();

        SignUp.insertData(name, email, '<html> </html>');
        SignUp.register();
        Toast.verifyMessage('É Permitido somente caracteres alfanuméricos e símbolos [-, #, @, +, =]');

        SignUp.clearForm();

        SignUp.insertData(name, email, '123');
        SignUp.register();
        Toast.verifyMessage('Mínimo de 6 caracteres para a senha');

        SignUp.clearForm();
        
        SignUp.insertData(name, email, '01234567891234567');
        SignUp.register();
        Toast.verifyMessage('Máximo de 16 caracteres para a senha');

        SignUp.clearForm();
    });

    it('Should invalidate the E-mail address already exists', () => {
        cy.intercept('POST', '/user/create', (req) => {
            req.continue((res) => {
                res.send({ fixture: 'emailError.json' });
            });
        }).as('post-createUserError');

        SignUp.insertData('Lab Luby', 'luby@admin.com', 'secret');
        SignUp.register();
       
        cy.wait('@post-createUserError')
        .its('response.body')
        .then(() => {
            cy.wait(100);
            Toast.verifyMessage('Email already exists');
        });

        cy.url().should('equal', `${Cypress.config().baseUrl}/sign-up`);
    });

    it('You must the register with success', () => {
        cy.intercept('POST', '/user/create', (req) => {
            req.continue((res) => {
                res.send(200, { fixture: 'user.json'});
            });
        }).as('post-createUserSuccess');

        SignUp.insertData('LabLuby', 'luby@admin.com', '_123456');
        SignUp.register();

        cy.wait('@post-createUserSuccess')
        .its('response.body')
        .then(() => {
            Toast.verifyMessage('Conta criada com sucesso');
            cy.wait(1000);
            cy.url().should('equal', `${Cypress.config().baseUrl}/sign-in`);
        });
    });
});