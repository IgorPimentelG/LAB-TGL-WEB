import api from '@shared/services/api/axios.config';
import { UpdateAccount } from '@shared/model/types/user';
import { IFormSignUp } from '@shared/model/interfaces/forms';
import { IUserResponse, IAuthResponse } from '@shared/model/interfaces/responses';

const user = () => {

    const createUser = async (data: IFormSignUp): Promise<IAuthResponse> => {
        return api.post('/user/create', data);
    }

    const account = async (): Promise<any> => {
        return api.get('/user/my-account');
    }

    const updateAccount = async (data: UpdateAccount): Promise<IUserResponse> => {
        return api.put('/user/update', JSON.stringify(data));
    } 

    return { createUser, account, updateAccount };
}

export default user;