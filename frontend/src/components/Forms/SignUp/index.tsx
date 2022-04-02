import FormModel from '../FormModel';
import { toast } from 'react-toastify';
import { user } from '@shared/services';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useInput } from '@hooks/index';
import { signUpShema } from '@shared/schema';
import { TIMER_AWAIT } from '@constants/timer';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ConfigForm } from '@shared/model/types/configForm';
import { loadingActions } from '@store/loading/loadingSlice';
import { IFormSignUp } from '@shared/model/interfaces/forms';
import { TypeButton } from '@shared/model/enums/typeButton';
import { PATH_SIGN_IN } from '@constants/pathnames';

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { register, handleSubmit, formState: { errors }, setError } = useForm<IFormSignUp>({
        resolver: yupResolver(signUpShema)
    });
    
    const { createInput } = useInput(register);
    const { createUser } = user();
    const { loadingEnabled, loadingDisabled } = loadingActions;

    const onRegisterHandler = (data: IFormSignUp) => {

        dispatch(loadingEnabled());

        const response = createUser(data);
        toast.promise(response, {
            pending: 'Criando sua conta',
            success: 'Conta criada com sucesso'
        });

        response.then(() => {
            setTimeout(() => {
                navigate(`${PATH_SIGN_IN}`);
                dispatch(loadingDisabled());
            }, TIMER_AWAIT);
        }).catch((error) => {
            toast.error(`${error.message}`);
            setError('name', { type: 'manual' });
            setError('email', { type: 'manual' });
            setError('password', { type: 'manual' });
            dispatch(loadingDisabled());
        });
    }

    const onBackHandler = () => {
        navigate(`${PATH_SIGN_IN}`);
    }

    const dataForm: ConfigForm = {
        titlePage: 'Sign Up',
        label: 'Registration',
        onSubmit: handleSubmit,
        errors: errors,
        inputs: [
            createInput('name', 'name', 'text', errors.name!), 
            createInput('email', 'email', 'text', errors.email!), 
            createInput('password', 'password', 'password', errors.password!),
        ],
        btnConfirm: {
            label: 'Register',
            type: TypeButton.CONFIRM,
            arrowRight: true,
            onClick: onRegisterHandler
        },
        btnNav: {
            label: 'Back',
            type: TypeButton.NAVIGATION,
            arrowLeft: true,
            nav: true,
            onClick: onBackHandler
        }
    }

    return(
        <FormModel data={dataForm}/>
    );
}

export default SignUp;