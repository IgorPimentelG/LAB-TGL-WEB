export interface IKeyboardData {
    numbersActive: number[]; 
    onAdd: (value: number) => void;
    onRemove: (value: number) => void;
}

export interface IConfigButtonKeyboard {
    label: string;
    value: number;
    color?: string;
    numbersActive: number[]; 
    handlers: IKeyboardData;
}