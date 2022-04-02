import styled from 'styled-components';
import { ConfigInput } from '@shared/model/types/configForm';

const setBorderRadius = (props: ConfigInput) => props.index === 0 ? '10px 10px 0 0' : 0;

export const TextField = styled.input<ConfigInput | any>`
    color: ${({theme: {colors}}) => colors.label};
    padding: 20px;
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    border: 0;
    border-bottom: 1px solid ${({theme: {colors}}) => colors.border};
    border: ${(props) => !props.isInvalid ? '' : `1px solid ${props.theme.colors.invalid}`};
    border-radius: ${setBorderRadius};
    background-color: transparent;

    &::placeholder {
        color: ${({theme: {colors}}) => colors.label}
    }

    &:focus {
        outline: none;
        border: 1px solid ${({theme: {colors}}) => colors.green};
        border-radius: ${setBorderRadius};
    }
`;