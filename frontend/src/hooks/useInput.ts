import { ConfigInput } from '@shared/model/types/configForm';
import { FieldError, UseFormRegister } from 'react-hook-form';

const useInput = (register: UseFormRegister<any>) => {
       
    const createInput = (name: string, label: string, type: string, error: FieldError): ConfigInput => {
        return {
            isInvalid: !!error,
            name,
            label,
            type,
            register
        }
    }

    return { createInput };
}

export { useInput };