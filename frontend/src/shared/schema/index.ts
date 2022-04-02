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

const nameSchema = {
    name: yup.string()
    .trim()
    .required('Informe o seu nome')
    .min(3, 'Nome muito curto')
    .matches(/^[a-zA-Z]+([\s][a-zA-Z]+){0,}[a-zA-Z]+$/g, 'Nome inválido')
};

export const signInSchema = yup.object().shape({
    ...baseEmailSchema,
    ...basePasswordSchema
});

export const signUpShema = yup.object().shape({
    ...nameSchema,
    ...baseEmailSchema,
    ...basePasswordSchema
});

export const resetPasswordSchema = yup.object().shape({
    ...baseEmailSchema
});

export const changePasswordSchema = yup.object().shape({
    password: basePasswordSchema.password,
    passwordConfirm: yup.string().required('Insira a confirmação da senha')
    .oneOf([yup.ref('password'), null], 'A confirmação de senha é diferente da senha escolhida')
});

export const myAccountSchema = yup.object().shape({
    ...nameSchema,
    ...baseEmailSchema
});
