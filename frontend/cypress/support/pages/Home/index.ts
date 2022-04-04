import { ELEMENTS } from './elements';

class Home {

    logout() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_LOGOUT}"]`).click();
    }

}

export default new Home();