import { TypeButton } from '@shared/model/enums/typeButton';
import { UseFormHandleSubmit, UseFormRegister, FieldError } from 'react-hook-form';

export type ConfigButton = {
    label: string;
    type: TypeButton;
    arrowLeft?: boolean;
    arrowRight?: boolean;
    nav?: boolean;
    onClick: (data: any) => void;
}

export type ConfigLink = {
    path: string;
    label: string;
}

export type ConfigInput = {
    type: string;
    name: string;
    label: string;
    index?: number;
    isInvalid: boolean;
    register: UseFormRegister<any>;
}

export type ConfigForm = {
    label: string;
    titlePage: string;
    link?: ConfigLink;
    inputs: ConfigInput[];
    btnNav?: ConfigButton;
    btnConfirm: ConfigButton;
    errors: object;
    onSubmit: UseFormHandleSubmit<any>;
}

