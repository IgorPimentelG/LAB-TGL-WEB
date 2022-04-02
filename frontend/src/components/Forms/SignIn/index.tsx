import React from 'react';
import FormModel from '@components/Forms/FormModel';
import { toast } from 'react-toastify';
import { auth } from '@shared/services';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useInput } from '@hooks/index';
import { signInSchema } from '@shared/schema';
import { TIMER_AWAIT } from '@constants/timer';
import { useNavigate } from 'react-router-dom';
import { authActions } from '@store/auth/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ConfigForm } from '@shared/model/types/configForm';
import { IFormSignIn } from '@shared/model/interfaces/forms';
import { TypeButton } from '@shared/model/enums/typeButton';
import { loadingActions } from '@store/loading/loadingSlice';
import { PATH_HOME, PATH_SIGN_UP } from '@constants/pathnames';

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors }, setError } = useForm<IFormSignIn>({
        resolver: yupResolver(signInSchema)
    });
    
    const { login } = auth();
    const { loadingEnabled, loadingDisabled } = loadingActions;
    const { createInput } = useInput(register);

    const onLogInHanler = async (data: IFormSignIn) => {
        dispatch(loadingEnabled());

        const response = login(data);

        toast.promise(response, {
            pending: 'Verificando seus dados',
            success: 'Seja Bem-Vindo',
        });

        response.then((data) => {
            if(data.status === 200) {  
                setTimeout(() => {
                    dispatch(authActions.login({
                        user: data.data.user,
                        token: data.data.token
                    }));
    
                    navigate(`${PATH_HOME}`, { replace: true });
                    dispatch(loadingDisabled());
                }, TIMER_AWAIT);
            }
        }).catch((error) => {
            toast.error(error.message);
            setError('email', { type: 'manual' });
            setError('password', { type: 'manual' });
            dispatch(loadingDisabled());
        });
    }

    const onSignUpHandler = () => {
        navigate(`${PATH_SIGN_UP}`);
    }

    const dataForm: ConfigForm = {
        titlePage: 'Sign In',
        label: 'Authentication',
        errors: errors,
        onSubmit: handleSubmit,
        inputs: [
            createInput('email', 'email', 'text', errors.email!),
            createInput('password', 'password', 'password', errors.password!),
        ],
        btnConfirm: {
            label: 'Log In',
            type: TypeButton.CONFIRM,
            arrowRight: true,
            onClick: onLogInHanler
        },
        btnNav: {
            label: 'Sign Up',
            type: TypeButton.NAVIGATION,
            arrowRight: true,
            nav: true,
            onClick: onSignUpHandler
        },
        link: {
            label: 'I forgot my password',
            path: '/reset-password'
        },
    }

    return(
        <React.Fragment>
            <FormModel data={dataForm}/>
        </React.Fragment>
    );
}

export default SignIn;