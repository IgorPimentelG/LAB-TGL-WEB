import { IKeyboardData } from '@shared/model/interfaces/bet';
import { IConfigButtonKeyboard } from './../shared/model/interfaces/bet';

const useKeyboard = (data: IKeyboardData) => {

    const getKeyboard = (max: number): IConfigButtonKeyboard[] => {
       const config: IConfigButtonKeyboard[] = [];

       for(let i = 1; i <= max; i++) {
        config.push({
            label: (i <= 9 ? `0${i}` : `${i}`),
            value: i,
            handlers: data,
            numbersActive: data.numbersActive
        });
       }

       return config;
    }

    return { getKeyboard };
}

export { useKeyboard };