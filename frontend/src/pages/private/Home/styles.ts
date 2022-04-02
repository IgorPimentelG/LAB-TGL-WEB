import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    margin: 50px 95px 0 95px;
    height: ${({theme: {view}}) => view.height};

    @media(max-width: 1090px) {
        margin: 50px 40px;
    }

    @media(max-width: 390px) {
        margin: 20px 40px;
    }
`;

export const ContainerOptions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media(max-width: 960px) {
        flex-direction: column-reverse; 
    }
`;

export const ContainerWarning = styled(ContainerOptions)`
    justify-content: center;
    height: 100%;
    flex-direction: column;
`;

export const ContainerTypesGames = styled.div`
    display: flex;
    align-items: center;
    
    @media(max-width: 800px) {
        flex-direction: column;
    }
`;

export const ContainerButton = styled(ContainerOptions)`
    justify-content: flex-end;
`;

export const ContainerFilter = styled.div`
    display: flex;

    @media(max-width: 430px) {
        flex-direction: column;
    }
`;

export const Label = styled.p`
    color: ${({theme: {colors}}) => colors.label};
    font-style: italic;
    margin-left: 40px;
    margin-right: 10px;

    @media(max-width: 800px) {
        margin: 10px;
    }
`;

export const ContainerBets = styled.div<any>`
    width: 50%;
    max-height: 326px;
    overflow: auto;

    @media(max-width: 960px) {
       width: 100%;
    }
`;

export const ContainerIcon = styled(ContainerOptions)`
    justify-content: center;
    width: 50%;
    position: relative;
    top: -15px;

    @media(max-width: 960px) {
       width: 100%;
    }
`;