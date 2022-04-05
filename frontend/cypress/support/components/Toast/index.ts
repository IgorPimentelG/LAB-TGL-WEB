class Toast {

    verifyMessage(message: string) {
        this.getToast().should('contain.text', message);
        this.isVisible();
    }

    verifyMessageRegex(regexp: RegExp) {
        cy.contains(regexp);
        this.isVisible();
    }

    isVisible() {
        this.getToast().should('be.visible');
    }

    getToast() {
        return cy.get('.Toastify__toast-body > :nth-child(2)');
    }
}

export default new Toast();