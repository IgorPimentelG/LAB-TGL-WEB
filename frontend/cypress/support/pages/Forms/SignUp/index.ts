import { ELEMENTS } from '../elements';

class SignUp {

    insertData(name: string, email: string, password: string) {
        this.getInputName().type(name);
        this.getInputEmail().type(email);
        this.getInputPassword().type(password);
    }

    clearForm() {
        this.getInputName().clear();
        this.getInputEmail().clear();
        this.getInputPassword().clear();
    }

    register() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_REGISTER}"]`).click();
    }  

    // Getters
    getInputName() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_NAME}"]`);
    }

    getInputEmail() {
        return  cy.get(`[data-cy="${ELEMENTS.INPUT_EMAIL}"]`);
    }

    getInputPassword() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_PASSWORD}"]`);
    }
}

export default new SignUp();