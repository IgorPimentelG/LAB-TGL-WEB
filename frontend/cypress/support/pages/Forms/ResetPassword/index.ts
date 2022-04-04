import { ELEMENTS } from './../elements';

class ResetPassword {

    insertEmail(email: string) {
        this.getEmailInput().type(email);
    }

    insertPassword(password: string, passwordConfirm: string) {
        this.getPasswordInput().type(password);
        this.getPasswordConfirmInput().type(passwordConfirm);
    }

    sendLink() {
        this.getButtonSendLink().click();
    }

    confirmChangePassword() {
        this.getButtonConfirm().click();
    }

    clearEmailForm() {
        this.getEmailInput().clear();
    }

    clearPasswordForm() {
        this.getButtonConfirm().click();
    }

    // Getters
    getEmailInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_EMAIL}"]`);
    }

    getPasswordInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_PASSWORD}"]`);
    }

    getPasswordConfirmInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_PASSWORD_CONFIRM}"]`);
    }

    getButtonSendLink() {
        return cy.get(`[data-cy="${ELEMENTS.BUTTON_SEND_LINK}"]`);
    }

    getButtonConfirm() {
        return cy.get(`[data-cy="${ELEMENTS.BUTTON_CONFIRM}"]`);
    }
}

export default new ResetPassword();