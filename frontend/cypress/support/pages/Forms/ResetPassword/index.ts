import { Form } from '../index';
import { ELEMENTS } from '../elements';

class ResetPassword extends Form {

    insertData(email: string) {
        super.getEmailInput().type(email);
    }

    clearForm() {
        super.clearEmailInput();
    }

    submit() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_SEND_LINK}"]`).click();
    }
}

export default new ResetPassword();