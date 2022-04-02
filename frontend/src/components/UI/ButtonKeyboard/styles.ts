import styled from 'styled-components';

export const Touchable = styled.button<any>`
    height: 50px;
    margin: 4px;
    width: 50px;
    border-radius: 100%;
    border: none;
    cursor: pointer;
    background-color: ${(props) => props.active ? props.color : props.theme.colors.buttonNumber};

    &:hover {
        background-color: ${(props) => props.color};
    }
`;

export const Label = styled.span`
    font-weight: bold;
    color: #FFF;
`;