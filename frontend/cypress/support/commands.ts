Cypress.Commands.add('autoLogin', (router: string) => {
    cy.visit(router, {
        onBeforeLoad: (win) => {
            win.localStorage.setItem('user', JSON.stringify(Cypress.env('user')));
            win.localStorage.setItem('token', JSON.stringify(Cypress.env('token')));
        }
    });
});

Cypress.Commands.add('authUserTest', () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('api')}/login`,
        body: {
            email: 'luby@test.com',
            password: 'secret'
        }
    }).then((res) => {
        cy.window().then((win) => {
            win.localStorage.setItem('user', JSON.stringify(res.body.user));
            win.localStorage.setItem('token', JSON.stringify(res.body.token));
        });
    });
});
