import { Form } from '../index';
import { ELEMENTS } from '../elements';

class SignIn extends Form {

    insertData(email: string, password: string) {
        super.getEmailInput().type(email);
        super.getPasswordInput().type(password);
    }

    submit() {
       this.getButtonLogIn().click();
    }

    clearForm() {
        super.getEmailInput().clear();
        super.getPasswordInput().clear();
    }

    getButtonLogIn() {
        return cy.get(`[data-cy="${ELEMENTS.BUTTON_LOGIN}"]`);
    }
}

export default new SignIn();