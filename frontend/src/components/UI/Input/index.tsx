import React from 'react';
import { TextField } from "./styles";
import { ConfigInput } from '@shared/model/types/configForm';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

const Input: React.FC<{ config: ConfigInput }> = ({ config }) => {

    const { name, label, type, index, isInvalid, register} = config;
    const isLoading = useSelector<RootState>((state) => state.loading.isLoading);

    return(
        <TextField
            {...register(name)}
            autoComplete='off'
            data-cy={`input-${name.toLowerCase()}`}
            type={type} 
            index={index}
            isInvalid={isInvalid}
            readOnly={isLoading}
            placeholder={`${label.charAt(0).toUpperCase()}${label.slice(1)}`} 
        />
    );
}

export default Input;

