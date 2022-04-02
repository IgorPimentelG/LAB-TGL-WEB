import styled from 'styled-components';
import { ConfigGame } from '@shared/model/types/game';

const getColor = (props: any) => props.color;

export const Touchable = styled.button<ConfigGame | any>`
    font-weight: bold;
    padding: 7px 20px;
    margin: 10px;
    width: 115px;
    border: 2px solid ${getColor};
    border-radius: 40px;
    color: ${(props) => props.active ? '#FFF' : props.color};
    background-color: ${(props) => props.active ? props.color : '#FFF'};

    &:hover {
        cursor: pointer;
        color: #FFF;
        background-color: ${getColor};
    };

    @media(max-width: 1060px) {
        margin: 5px;
    }
`;