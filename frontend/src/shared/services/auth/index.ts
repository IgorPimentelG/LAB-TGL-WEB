import api from '@shared/services/api/axios.config';
import { IAuthResponse, IUserResponse } from '@shared/model/interfaces/responses';
import { DataChangePassword } from '@shared/model/types/user';
import { IFormSignIn, IFormResetPassword } from '@shared/model/interfaces/forms';

const auth = () => {

    const login = async (credentails: IFormSignIn): Promise<IAuthResponse> => {
        return api.post('/login', credentails);
    }

    const verifyEmail = async (account: IFormResetPassword): Promise<IAuthResponse | any> => {
        return api.post('/reset', account);
    }

    const changePassword = async (data: DataChangePassword): Promise<IUserResponse> => {
        return api.post(`/reset/${data.token}`, JSON.stringify({password: data.password}));
    }

    return { login, verifyEmail, changePassword };
}

export default auth;