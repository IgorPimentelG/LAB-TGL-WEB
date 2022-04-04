import * as yup from 'yup';
import { baseEmailSchema, basePasswordSchema, baseNameSchema } from './validationDefults';

const signInSchema = yup.object().shape({
    ...baseEmailSchema,
    password: yup.string()
    .trim()
    .required('Insira sua senha')
});

const signUpShema = yup.object().shape({
    ...baseNameSchema,
    ...baseEmailSchema,
    ...basePasswordSchema
});

const resetPasswordSchema = yup.object().shape({
    ...baseEmailSchema
});

const changePasswordSchema = yup.object().shape({
    password: basePasswordSchema.password,
    passwordConfirm: yup.string().required('Insira a confirmação da senha')
    .oneOf([yup.ref('password'), null], 'A confirmação de senha é diferente da senha escolhida')
});

const myAccountSchema = yup.object().shape({
    ...baseNameSchema,
    ...baseEmailSchema
});

export { signInSchema, signUpShema, resetPasswordSchema, changePasswordSchema, myAccountSchema };