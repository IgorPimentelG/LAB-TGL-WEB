import styled, { keyframes } from 'styled-components';

const loading = keyframes`
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(209, 209, 209);
    height: 100vh;
    width: 100%;
    z-index: 999;
`;

export const Spinner = styled.div`
    display: flex;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-top: 20px;
    border: 5px solid;
    border-radius: 50px;
    border-color: transparent ${({theme: {colors}}) => colors.green};
    animation: ${loading} 1s linear infinite;
`;
