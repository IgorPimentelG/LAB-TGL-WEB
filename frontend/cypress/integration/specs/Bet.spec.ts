/// <reference types="cypress"/>

import NewBet from '../../support/pages/NewBet/index';
import Toast from '../../support/components/Toast/index';
import Modal from '../../support/components/Modal/index';

describe('New Bet Tests', () => {

    beforeEach(() => {
      cy.authUserTest();
      cy.visit('/');
      cy.get('[data-cy="button-newbet"]').click();
      NewBet.setMaxTypeGame();
    });

    it('Should invalidate the button addToCart when bet is empty', () => {
        NewBet.addToCart();
        Toast.verifyMessageRegex(/Faltam \d{1,} números no seu jogo/g);
        NewBet.getContainerCart().should('contain', 'Carrinho vazio');
    });

    it('Should remove item from cart', () => {
        NewBet.completeGame();
        NewBet.addToCart();
        NewBet.addRemoveItemFromCart();
        Modal.cancel();
        NewBet.addRemoveItemFromCart();
        Modal.confirm();
        NewBet.getContainerCart().should('contain', 'Carrinho vazio');
    });

    it('Should invalidate when the min value was not reached in cart', () => {
        for(let i = 0; i < 5; i++) {
            NewBet.completeGame();
            NewBet.addToCart();
        }

        NewBet.save();
        Toast.verifyMessageRegex(
            /Valor total mínimo é acima de R\$ \d{1,},\d{1,} para salvar os jogos. Faltam R\$ \d{1,},\d{1,} em jogos/g
        );
    });

    it('Should save bets with success', () => {
        for(let i = 0; i < 15; i++) {
            NewBet.completeGame();
            NewBet.addToCart();
        }

        NewBet.getContainerCart().then((element) => {
            expect(element).to.be.length.above(0);
        });

        NewBet.save();
        Modal.cancel();
        NewBet.save();
        Modal.confirm();

        Toast.verifyMessage('Jogos salvos com sucesso!');
        cy.url().should('equal', `${Cypress.config().baseUrl}/home`)
    });
});