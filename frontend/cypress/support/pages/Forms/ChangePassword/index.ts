import { Form } from '../index';
import { ELEMENTS } from '../elements';

class ChangePassword extends Form {

    insertData(password: string, passwordConfirm: string) {
        this.getPasswordInput().type(password);
        this.getPasswordConfirmInput().type(passwordConfirm);
    }

    submit() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_CONFIRM}"]`).click();
    }

    clearForm() {
        super.clearPasswordInput();
        this.getPasswordConfirmInput().clear();
    }

    // Getter
    getPasswordConfirmInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_PASSWORD_CONFIRM}"]`);
    }
}

export default new ChangePassword();