/// <reference types="cypress"/>
// @ts-check

import Home from '../../support/pages/Home/index';

describe('Filters Games Tests', () => {

    before(() => {
        cy.autoLogin('/home');
        Home.setMaxTypeGame();
    });

    it('Should display a message when user bets are empty', () => {
        Home.getContainerWarning().should('is.visible');
        Home.getContainerWarning().should('contain.text', 'Nenhuma aposta realizada');
    });

    it('Should display bets when load page', () => {
        Home.logout();
        cy.window().then((win) => {
            win.localStorage.setItem('user', JSON.stringify(Cypress.env('user')));
            win.localStorage.setItem('token', JSON.stringify(Cypress.env('token')));
        });
        
        cy.visit('/home');
        cy.intercept('GET', `${Cypress.env('api')}/user/my-account`, {
            statusCode: 200,
            fixture: 'userBets.json'
        }).as('get-bets');

        cy.wait('@get-bets').its('response.body').then((res) => {
            cy.wait(500).then(() => {
                Cypress.env('betsLength', res.bets.length);
                Home.verifyBetsListLengthInView();
            });
        });
    });

    it('Should update the bets list according to the game type selected', () => {
        for(let i = 0; i < Home.getTypeGameLength(); i++) {
            cy.wait(500).then(() => {
                Home.filterGame();
                Home.verifyUpdateBetsListFilter();
            });
        }      
    });

    it('Should update the list bets unfiltered', () => {
        for(let i = 0; i < Home.getTypeGameLength(); i++) {
            Home.filterGame();
        }
        Home.verifyBetsListLengthInView();
    });

    it('Should update the bets list with one type game', () => {
        Home.verifyOneByOneTypeGame();
    });
});