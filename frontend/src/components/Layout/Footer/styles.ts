import styled from 'styled-components';

export const Container = styled.footer`
    position: relative;
    padding: 10px 0;
    bottom: 0;
    width: 100%;
    border-top: 2px solid ${({theme: {colors}}) => colors.border};
    text-align: center;
    background-color: #F7F7F7;
`;

export const Text = styled.p`
    color: ${({theme: {colors}}) => colors.text};
    font-size: 15px;
`;

export const Space = styled.span`
    margin: 3px;
`;