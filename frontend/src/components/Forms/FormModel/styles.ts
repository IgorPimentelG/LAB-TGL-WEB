import styled from 'styled-components';

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ContainerLink = styled.div`
    width: 100%;
    text-align: end;
    
    & a {
        text-decoration: none;
    }
`;

export const TextLink = styled.p`
    color: ${({theme: {colors}}) => colors.link};
    margin: 20px 25px 10px 0;
    font-style: italic;
    font-size: 12px;

    &:hover {
        color: ${({theme: {colors}}) => colors.label};
    }
`;