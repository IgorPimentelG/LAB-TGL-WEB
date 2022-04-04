import { ELEMENTS } from '../elements';
import { Form } from '../index';

class SignUp extends Form {

    insertData(name: string, email: string, password: string) {
        super.getNameInput().type(name);
        super.getEmailInput().type(email);
        super.getPasswordInput().type(password);
    }

    clearForm() {
        super.clearNameInput();
        super.clearEmailInput();
        super.clearPasswordInput();
    }

    submit() {
        cy.get(`[data-cy="${ELEMENTS.BUTTON_REGISTER}"]`).click();
    }  
}

export default new SignUp();