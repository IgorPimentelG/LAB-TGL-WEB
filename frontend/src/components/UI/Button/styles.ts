import styled from 'styled-components';
import { TypeButton } from '@shared/model/enums/typeButton';
import { ConfigButton } from '@shared/model/types/configForm';

export const Touchable = styled.button<ConfigButton | any>`
    width: 100%;
    padding: 20px;
    color: ${({ type, theme: { colors }}) => type === TypeButton.CONFIRM ? colors.green: colors.text};
    font-weight: bold;
    font-size: 22px;
    font-style: italic;
    border: none;
    background-color: transparent;
  
    &:hover {
        color: ${({theme: {colors}}) => colors.label};
        cursor: pointer;
    }
`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    
    &:hover {
        transform: scale(1.1);
    }
`;