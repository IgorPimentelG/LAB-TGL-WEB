import { Form } from '../index';
import { ELEMENTS } from '../elements';

class SignIn extends Form {

    insertData(email: string, password: string) {
        super.getEmailInput().type(email);
        super.getPasswordInput().type(password);
    }

    submit() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_LOGIN}"]`).click();
    }

    clearForm() {
        super.clearEmailInput();
        super.clearPasswordInput();
    }
}

export default new SignIn();