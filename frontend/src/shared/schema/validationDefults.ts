import * as yup from 'yup';

const baseEmailSchema = {
    email: yup.string()
    .email('Insira um e-mail válido')
    .required('Insira o seu e-mail')
};

const basePasswordSchema = {
    password: yup.string()
    .trim()
    .required('Insira sua senha')
    .min(6, 'Mínimo de 6 caracteres para a senha')
    .max(16, 'Máximo de 16 caracteres para a senha')
    .matches(/^[\w_\-#@+=]+$/g, 'É Permitido somente caracteres alfanuméricos e símbolos [-, #, @, +, =]')
}

const baseNameSchema = {
    name: yup.string()
    .trim()
    .required('Informe o seu nome')
    .min(3, 'Nome muito curto')
    .matches(/^[a-zA-Z]+([\s][a-zA-Z]+){0,}[a-zA-Z]+$/g, 'Nome inválido')
};

export { baseEmailSchema, basePasswordSchema, baseNameSchema };