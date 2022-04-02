import FormModel from '../FormModel';
import { toast } from 'react-toastify';
import { auth } from '@shared/services';
import { useForm } from 'react-hook-form';
import { useInput } from '@hooks/index';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '@shared/schema';
import { TypeButton } from '@shared/model/enums/typeButton';
import { ConfigForm } from '@shared/model/types/configForm';
import { IFormChangePassword } from '@shared/model/interfaces/forms';
import { PATH_SIGN_IN, PATH_RESET_PASSWORD } from '@constants/pathnames';

const ChangePassword = () => {

    const params = useParams();
    const navigate = useNavigate();
    const { changePassword } = auth();
    
    const { register, handleSubmit, formState: { errors } } = useForm<IFormChangePassword>({
        resolver: yupResolver(changePasswordSchema)
    });

    const { createInput } = useInput(register);
  
    const onConfirm = (data: IFormChangePassword) => {
        
        const response = changePassword({password: data.password, token: params.token!});
        toast.promise(response, {
            pending: 'Alterando senha',
            success: 'Senha alterada com sucesso',
            error: 'Usuário não encontrado na base de dados'
        });

        response.then(() => {
            navigate(`${PATH_SIGN_IN}`);
        });
    }

    const onCancel = () => {
        navigate(`${PATH_RESET_PASSWORD}`);
    }
    
    const dataForm: ConfigForm = {
        label: 'Change password',
        titlePage: 'Change Password',
        errors: errors,
        onSubmit: handleSubmit,
        inputs: [
            createInput('password', 'new password', 'password', errors.password!),
            createInput('passwordConfirm', 'confirm password', 'password', errors.passwordConfirm!)
        ],
        btnNav: {
            label: 'Back',
            type: TypeButton.NAVIGATION,
            arrowLeft: true,
            nav: true,
            onClick: onCancel
        },
        btnConfirm: {
            label: 'Confirm',
            type: TypeButton.CONFIRM,
            arrowRight: true,
            onClick: onConfirm
        }
    }

    return(
        <FormModel data={dataForm}/>
    );
}

export default ChangePassword;