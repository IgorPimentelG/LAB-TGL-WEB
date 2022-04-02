import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin-top: 10px;
`;

export const Text = styled.h1`
    color: ${({theme: {colors}}) => colors.text};
    font-style: italic;
    font-size: 3rem;
    margin: 0;
    padding: 0;
`;

export const Line = styled.div`
    width: 100%;
    background-color: ${({theme: {colors}}) => colors.green};
    padding: 3px;
    border-radius: 50px;
`;