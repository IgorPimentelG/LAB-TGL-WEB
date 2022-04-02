import { ELEMENTS } from './../elements';

class SignIn {

    insertData(email: string, password: string) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
    }

    logIn() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_LOGIN}"]`).click();
    }

    clearForm() {
        this.getEmailInput().clear();
        this.getPasswordInput().clear();
    }

    // Getters
    getEmailInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_EMAIL}"]`);
    }

    getPasswordInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_PASSWORD}"]`);
    }
}

export default new SignIn();