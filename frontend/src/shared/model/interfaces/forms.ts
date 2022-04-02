export interface IFormSignIn {
    email: string;
    password: string;
}

export interface IFormSignUp {
    name: string;
    email: string;
    password: string;
}

export interface IFormResetPassword {
    email: string;
}

export interface IFormChangePassword {
    password: string;
    passwordConfirm: string;
}

export interface IFormAccount {
    name: string;
    email: string;
}