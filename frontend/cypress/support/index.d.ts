/// <reference types="cypress"/>

declare namespace Cypress {
    interface Chainable {
      autoLogin(router: string): void;
      authUserTest(): void;
    }
}