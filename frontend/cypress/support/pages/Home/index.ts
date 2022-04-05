/// <reference types="cypress"/>

import { ELEMENTS } from './elements';

class Home {

    private switchGameCount = 1;
    private typeGames = [];
    private lastBetsFilterCount = 0;

    private updateSwitchGame() {
        if( this.switchGameCount < this.typeGames.length ) {
            this.switchGameCount++;
        } else {
            this.switchGameCount = 1;
            this.lastBetsFilterCount = 0;
        }
    }

    logout() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_LOGOUT}"]`).click();
    }

    filterGame() {
        this.getContainerBets().then((element) => {
             this.lastBetsFilterCount += element.children().length;
        });

        cy.get(`[data-cy="switch-game-${this.switchGameCount}"]`).click();
        this.updateSwitchGame();
    }

    verifyUpdateBetsListFilter() {
        this.getContainerBets().then((element) => {
            const newBetsfilterCount = this.lastBetsFilterCount + element.children().length;
            expect(newBetsfilterCount).to.above(this.lastBetsFilterCount);
         });
    }

    verifyBetsListLengthInView() {
        this.getContainerBets().then((element) => {
            expect(element.children().length).to.be.equal(Cypress.env('betsLength'));
        });
    }

    verifyOneByOneTypeGame() {
        this.typeGames.forEach((typeGame, index) => {
            cy.get(`[data-cy="switch-game-${(index + 1)}"]`).click();

            cy.wait(500).then(() => {
                 this.getContainerBets().then((element) => {    
                    Array.prototype.forEach.call(element, (cardBet: HTMLElement) => {
                        const regex = new RegExp(`${typeGame.type}|Nenhuma aposta realizada`);
                        expect(cardBet.innerText).to.match(regex);
                    });
                });
            });

            cy.get(`[data-cy="switch-game-${(index + 1)}"]`).click();
        });
    }

    setMaxTypeGame() {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3333/cart_games'
        }).then((res) => {
            this.typeGames = res.body.types;
        });
    }

    // Getters
    getContainerWarning() {
        return cy.get(`[data-cy="${ELEMENTS.CONTAINER_WARNING}"]`);
    }

    getContainerBets() {
        return cy.get(`[data-cy="${ELEMENTS.CONTAINER_BETS}"]`);
    }

    getTypeGameLength() {
        return this.typeGames.length;
    }
}

export default new Home();