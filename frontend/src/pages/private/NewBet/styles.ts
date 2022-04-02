import styled from 'styled-components';

const getColorHover = (props: any) => props.reverser ? props.theme.colors.green : props.theme.colors.greenDark;

export const Main = styled.main`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-bottom: 100px;
    height: 100%;
    width: fit-content;
    overflow: auto;
    
    @media(max-width: 1070px) {
      justify-content: center;
    }

    @media(max-width: 1030px) {
        flex-direction: column;
        padding: 10px;
    }
`;

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 30px 90px;

    @media(max-width: 1180px) {
      width: 40%;
    }

    @media(max-width: 1070px) {
      margin: 10px;
    }

    @media(max-width: 1030px) {
       width: 100%;
    }
`;

export const ContainerCard = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const ContainterOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;

    @media(max-width: 460px) {
       flex-direction: column;
       width: 100%;
    }
`;

export const ContainerButtonOptions = styled.div`
    display: flex;

    @media(max-width: 460px) {
       flex-direction: column;
       justify-content: center;
       width: 100%;
    }
`;

export const ContainerCart = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 5px;
    padding: 0 5px;
    max-height: 290px;
    overflow: auto;
`;

export const ContainerIconScroll = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ContainerKeyoard = styled.div`
    display: grid;
    grid-template-columns: repeat(9, auto);
    justify-content: center;

    @media(max-width: 1180px) {
        grid-template-columns: repeat(8, auto);
    }

    @media(max-width: 1070px) {
        grid-template-columns: repeat(6, auto);
    }

    @media(max-width: 1030px) {
        grid-template-columns: repeat(9, auto);
    }

    @media(max-width: 580px) {
        grid-template-columns: repeat(7, auto);
    }

    @media(max-width: 480px) {
        grid-template-columns: repeat(5, auto);
    }

    @media(max-width: 335px) {
        grid-template-columns: repeat(3, auto);
    }
`;

export const ContainerTypesGames = styled.div`
    display: flex;

    @media(max-width: 460px) {
       flex-direction: column;
       justify-content: center;
       align-items: center;
       width: 100%;
    }
`;

export const LabelType = styled.span`
    color: ${({theme: {colors}}) => colors.label};
    font-weight: lighter;
    text-transform: uppercase;
`;

export const Label = styled.p`
    font-weight: bold;
    font-style: italic;
    color: ${({theme: {colors}}) => colors.text};
    font-size: 14px;
    margin: 10px;
`;

export const Text = styled(Label)`
    color: ${({theme: {colors}}) => colors.label};
    font-weight: normal;
    margin-top: 0;
`;

export const LabelButton = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ButtonOption = styled.button<any>`
    color: ${(props) => props.reverser ? '#FFF' : `${props.theme.colors.greenDark}`};
    background-color: ${(props) => props.reverser ? props.theme.colors.greenDark : 'transparent'};
    border: 1px solid ${({theme: {colors}}) => colors.greenDark};
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    margin: 10px;
    cursor: pointer;

    &:hover {
        color: #FFF;
        background-color: ${getColorHover};
        border-color: ${getColorHover}
    }
`;

export const ButtonSave = styled.button`
    color: ${({theme: {colors}}) => colors.greenDark};
    background-color: #F4F4F4;
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
    padding: 20px 110px;
    border: 1px solid ${({ theme: {colors}}) => colors.border};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    cursor: pointer;
`;

export const LabelTotal = styled(LabelType)`
    font-style: normal;
`;