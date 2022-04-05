import { ELEMENTS } from './elements';

class NewBet {

    private switchGameCount = 1;
    private maxTypeGame = 0;

    private updateSwitchGame() {
        if( this.switchGameCount < this.maxTypeGame ) {
            this.switchGameCount++;
        } else {
            this.switchGameCount = 1;
        }
    }

    completeGame() {
        cy.get(`[data-cy="switch-game-${this.switchGameCount}"]`).click();
        cy.get(`[data-cy=${ELEMENTS.BUTTON_COMPLETE_GAME}]`).click();
        this.updateSwitchGame();
    }

    addToCart() {
        cy.get(`[data-cy=${ELEMENTS.BUTTON_ADD_CART}]`).click();
    }

    save() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_SAVE}"]`).click();
    }

    addRemoveItemFromCart() {
        cy.get(`[data-cy=${ELEMENTS.BUTTON_REMOVE_ITEM}]`).click();
    }

    setMaxTypeGame() {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3333/cart_games'
        }).then((res) => {
            this.maxTypeGame = res.body.types.length;
        });
    }

    // Getters
    getContainerCart() {
        return cy.get(`[data-cy="${ELEMENTS.CONTAINER_CARD}"]`);
    }
}

export default new NewBet();