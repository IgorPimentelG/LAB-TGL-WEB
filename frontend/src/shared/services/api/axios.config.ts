import axios, { AxiosError } from 'axios';
import { Token } from '@shared/model/types/user';
import { IApiError } from '@shared/model/interfaces/errors';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    headers: {
        'Content-Type': 'application/json'
    }
});

const createError = (error: AxiosError): IApiError => {

    const { response } = error;
    const errorMessage = response?.data.message ? response?.data.message : response?.data.error.message;

    return {
        message: response ? errorMessage : 'Sem conexão com o servidor',
        statusCode: response ? response.status! : 500,
        statusText: response ? response.statusText! : 'Internal Server Error'
     };
}

api.interceptors.request.use(async (config) => {

    const token: Token = JSON.parse(localStorage.getItem('token')!);

    if( token ) {
        config.headers!.Authorization = `${token.type} ${token.token}`
    }
    
    return config;

}, (error: AxiosError) => {
    const apiError = createError(error);
    return Promise.reject(apiError);
});


api.interceptors.response.use(async (response) => {

    const token = response.data?.token;
    const user = response.data?.user;

    if( token && user ) {
        localStorage.clear();
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
    }

    return response;
    
}, (error: AxiosError) => {
    const apiError = createError(error);
    return Promise.reject(apiError);
});

export default api;