import FormModel from '../FormModel';
import { toast } from 'react-toastify';
import { auth } from '@shared/services'; 
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { resetPasswordSchema } from '@shared/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useInput } from '@hooks/index';
import { ConfigForm } from '@shared/model/types/configForm';
import { TypeButton } from '@shared/model/enums/typeButton';
import { IFormResetPassword } from '@shared/model/interfaces/forms';
import { PATH_RESET_PASSWORD, PATH_SIGN_IN } from '@constants/pathnames';

const ResetPassword = () => {

    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors }, setError}  = useForm<IFormResetPassword>({
        resolver: yupResolver(resetPasswordSchema)
    });
    
    const { createInput } = useInput(register);
    const { verifyEmail } = auth();

    const onSendLinkHandler = (data: IFormResetPassword) => {

        const response = verifyEmail(data);
        toast.promise(response, {
            pending: 'Verificando seu e-mail',
            success: 'Defina sua nova senha'
        });

        response.then(({data}) => {
            navigate(`${PATH_RESET_PASSWORD}/${data.token}`);
        }).catch((error) => {
            toast.error(`${error.message}`);
            setError('email', { type:'manual' });
        });
    }

    const onBackHandler = () => {
        navigate(`${PATH_SIGN_IN}`);
    }

    const dataForm: ConfigForm = {
        titlePage: 'Reset Password',
        label: 'Reset password',
        errors: errors,
        onSubmit: handleSubmit,
        inputs: [
            createInput('email', 'email', 'text', errors.email!)
        ],
        btnConfirm: {
            label: 'Send link',
            type: TypeButton.CONFIRM,
            arrowRight: true,
            onClick: onSendLinkHandler
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

export default ResetPassword;