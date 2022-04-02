class Toast {

    verifyMessage(message: string) {
        this.getToast().should('contain.text', message);
    }

    getToast() {
        return cy.get('.Toastify__toast-body > :nth-child(2)');
    }
}

export default new Toast();