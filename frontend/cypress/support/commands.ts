Cypress.Commands.add('autoLogin', (router: string) => {
    cy.visit(router, {
        onBeforeLoad: (win) => {
            win.localStorage.setItem('user', JSON.stringify(Cypress.env('user')));
            win.localStorage.setItem('token', JSON.stringify(Cypress.env('token')));
        }
    });
});

Cypress.Commands.add('validateEmailInput', () => {

});

Cypress.Commands.add('validatePasswordInput', () => {

});

Cypress.Commands.add('validateNameInput', () => {

})