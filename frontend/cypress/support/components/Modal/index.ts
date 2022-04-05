class Modal {

    confirm() {
        cy.get('[data-cy="button-confirm"]').click();
    }

    cancel() {
        cy.get('[data-cy="button-cancel"]').click();
    }
}

export default new Modal();