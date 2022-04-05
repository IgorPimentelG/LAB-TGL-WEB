import React from 'react';
import { Touchable } from './styles';
import { ConfigGame } from '@shared/model/types/game';

const ButtonGame: React.FC<{ config: ConfigGame }> = ({ config }) => {
    return(
        <Touchable 
            data-cy={`switch-game-${config.id}`}
            onClick={config.onClick}
            color={config.color}
            active={config.active}
        >
            <span>{config.name}</span>
        </Touchable>
    );
}

export default ButtonGame;