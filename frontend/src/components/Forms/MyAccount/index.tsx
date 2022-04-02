import React, { useEffect, useState } from 'react';
import FormModel from '../FormModel';
import { toast } from 'react-toastify';
import { Modal } from '@components/Layout';
import { user, auth } from '@shared/services';
import { RootState } from '@store/index';
import { useForm } from 'react-hook-form';
import { myAccountSchema } from '@shared/schema';
import { authActions } from '@store/auth/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '@hooks/index';
import { TypeButton } from '@shared/model/enums/typeButton';
import { ConfigForm } from '@shared/model/types/configForm';
import { loadingActions } from '@store/loading/loadingSlice';
import { IFormAccount } from '@shared/model/interfaces/forms';
import { UpdateAccount, User } from '@shared/model/types/user';

const MyAccount = () => {
    
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<IFormAccount>({
        resolver: yupResolver(myAccountSchema)
    });
    
    const { updateUser } = authActions;
    const { loadingEnabled, loadingDisabled } = loadingActions;
    const { updateAccount } = user();
    const { verifyEmail } = auth();
    const { createInput } = useInput(register);

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const userData = useSelector<RootState, User>((state) => state.auth.user);
   
    useEffect(() => {
        setValue('name', userData.name);
        setValue('email', userData.email);
    }, []);
  
    const handlerConfirm = async () => {

        const dataForm = {
            name: getValues('name'),
            email: getValues('email')
        }

        dispatch(loadingEnabled());

        const verifyEmailResponse = verifyEmail({email: dataForm.email});
        toast.promise(verifyEmailResponse, {
            pending: 'Verificando conta'
        });

        verifyEmailResponse.then(({data}) => {
            
            const { id } = data;

            if( id === userData.id) {
                update(dataForm);
            } else {
                toast.error('E-mail já cadastrado');
            } 
        }).catch(() => {
            update(dataForm);
        });

        dispatch(loadingDisabled());
        handlerCancel();
    }

    const update = (dataForm: UpdateAccount) => {
        const response = updateAccount(dataForm);
        toast.promise(response, {
            pending: 'Atualizando conta',
            success: 'Sua conta foi atualizada com sucesso',
        });

        response.then(() => {
            dispatch(updateUser({name: dataForm.name, email: dataForm.email}));
        }).catch(() => {
            toast.error('Aconteceu um erro ao atualizar sua conta');
        });
    }

    const handlerSave = () => {
        const data = {
            name: getValues('name'),
            email: getValues('email')
        }

        if(userData.name !== data.name || userData.email !== data.email) {
            setShowModalConfirm(true);
        }
    }

    const handlerCancel = () => {
        setShowModalConfirm(false);
    }

    const dataForm: ConfigForm = {
        label: 'My Account',
        titlePage: 'My Account',
        errors: errors,
        onSubmit: handleSubmit,
        inputs: [
            createInput('name', 'name', 'text', errors.name!),
            createInput('email', 'email', 'text', errors.email!)
        ],
        btnConfirm: {
            label: 'Save',
            type: TypeButton.CONFIRM,
            onClick: handlerSave
        }
    }

    return(
        <React.Fragment>
           {showModalConfirm && 
                <Modal data={{
                    title: 'Deseja atualizar sua conta?',
                    onConfirm: handlerConfirm,
                    onCancel: handlerCancel,
                }}/>
            }
            <FormModel data={dataForm}/>
        </React.Fragment>
    );   
}

export default MyAccount;