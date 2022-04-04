/// <reference types="cypress"/>

declare namespace Cypress {
    interface Chainable {
      autoLogin(router: string): void;
      validateEmailInput(): void;
      validateNameInput(): void;
      validatePasswordInput(): void;
    }
}