import styled from 'styled-components';

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${({theme: {view}}) => view.height};
`;

export const Container = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 70px;
`;

export const ContainerIcon = styled.div`
    margin: 10px;
`;