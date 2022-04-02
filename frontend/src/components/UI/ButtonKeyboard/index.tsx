import React, { useEffect, useState } from 'react';
import { Touchable, Label } from './styles';
import { IConfigButtonKeyboard } from '@shared/model/interfaces/bet';

const ButtonKeyboard: React.FC<{ config: IConfigButtonKeyboard }> = React.memo( 
    ({ config }) => {

        const [isActive, setIsActive] = useState<boolean>(false);
        const { label, value, color, numbersActive, handlers } = config;

        useEffect(() => {
            if( numbersActive.length === 0 ) {
                setIsActive(false);
            } else {
                const index = numbersActive.indexOf(value);
                setIsActive((index !== -1) ? true : false);
            }
        }, [numbersActive]);

        const handlerNumber = () => {

            const number = config.value;

            if( !isActive ) {
                handlers.onAdd(number);
            } else {
                handlers.onRemove(number);
            }
        }
        
        return(
            <Touchable 
                onClick={handlerNumber}
                color={color} 
                active={isActive}
            >
                <Label>{label}</Label>
            </Touchable>
        );
    }
);

export default ButtonKeyboard;