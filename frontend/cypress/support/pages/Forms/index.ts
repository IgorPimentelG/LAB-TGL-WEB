import { ELEMENTS } from './elements';
import Toast from '../../components/Toast/index';

abstract class Form {
    
    abstract submit(): void;
    abstract clearForm(): void;

    validationEmailInput() {
       if( !!this.getEmailInput() ) {
        this.getEmailInput().type('luby@com');
        this.submit();
        Toast.verifyMessage('Insira um e-mail válido');

        this.clearEmailInput();

        this.getEmailInput().type('       ');
        this.submit();
        Toast.verifyMessage('Insira um e-mail válido');

        this.clearEmailInput();
        
        this.getEmailInput().type('luby@');
        this.submit();
        Toast.verifyMessage('Insira um e-mail válido');
       }
    }

    validationPasswordInput() {
        if( !!this.getPasswordInput() ) {
            this.getPasswordInput().type('          ');
            this.submit();
            Toast.verifyMessage('Insira sua senha');

            cy.window().location().then(
                (loc) => {
                    if(loc.pathname !== '/sign-in') {

                        this.clearPasswordInput();

                        this.getPasswordInput().type('<html> </html>');
                        this.submit();
                        Toast.verifyMessage('É Permitido somente caracteres alfanuméricos e símbolos [-, #, @, +, =]');
                
                        this.clearPasswordInput();
                
                        this.getPasswordInput().type('123');
                        this.submit();
                        Toast.verifyMessage('Mínimo de 6 caracteres para a senha');
                
                        this.clearPasswordInput();
                
                        this.getPasswordInput().type('01234567891234567');
                        this.submit();
                        Toast.verifyMessage('Máximo de 16 caracteres para a senha');
                
                        this.clearPasswordInput();
                    }
                }
            );
        }
    }

    validationNameInput() {
        if( !!this.getNameInput() ) {
            this.getNameInput().type('     ');
            this.submit();
            Toast.verifyMessage('Informe o seu nome');
    
            this.clearNameInput();
    
            this.getNameInput().type('Lab Luby 1');
            this.submit();
            Toast.verifyMessage('Nome inválido');

            this.clearNameInput();
    
            this.getNameInput().type('La');
            this.submit();
            Toast.verifyMessage('Nome muito curto');
        }
    }

    clearPasswordInput() {
        this.getPasswordInput().clear();
    }

    clearEmailInput() {
        this.getEmailInput().clear();
    }

    clearNameInput() {
        this.getNameInput().clear();
    }

    // Getters
    getEmailInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_EMAIL}"]`);
    }

    getPasswordInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_PASSWORD}"]`);
    }

    getNameInput() {
        return cy.get(`[data-cy="${ELEMENTS.INPUT_NAME}"]`);
    }
}

export { Form };
