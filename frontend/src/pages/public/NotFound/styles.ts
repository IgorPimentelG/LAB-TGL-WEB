import styled from 'styled-components';

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
`;

export const Container = styled(Main)`
    flex-direction: column;
    height: min-content;
`;

export const ContainerLogo = styled(Main)`
    height: auto;
    margin: 50px;
`;

export const Contents = styled(Main)`
    height: fit-content;
    width: max-content;
    margin-top: 10px;
    padding: 20px;
    flex-direction: column;
    border-bottom: 2px solid ${({ theme: {colors}}) => colors.border};
`;

export const Title = styled.h1`
    font-weight: bold;
    font-size: 28px;
    text-transform: uppercase;
    color: ${({ theme: {colors}}) => colors.text};
    margin: 5px;

    @media(max-width: 330px) {
        font-size: 20px;
    }

    @media(max-width: 250px) {
        font-size: 16px;
    }    

    @media(max-width: 210px) {
        font-size: 10px;
    }
`;

