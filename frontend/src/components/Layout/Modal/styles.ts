import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(209, 209, 209, 0.6);
    height: ${({ theme: {view}}) => view.height};
    width: 100%;
    z-index: 999;
`;

export const ContainerCard = styled.div`
    margin: 10px;
    padding: 5px 50px;

    @media(max-width: 400px) {
        padding: 5px 10px;
    }

    @media(max-width: 270px) {
        padding: 0;
    }
`;

export const ContainerOptions = styled.div`
    display: flex;
    width: 100%;
    margin-top: 15px;
    flex-direction: row;
    justify-content: flex-end;
`;

export const Touchable = styled.button`
    cursor: pointer;
    font-weight: bold;
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: #FFF;
    background-color: ${(props) => props.color};
`;

export const Title = styled.h2`
    color: ${({ theme: {colors}}) => colors.text};
    text-align: center;
    font-style: italic;
    margin-bottom: 15px;
`;

export const Label = styled.p`
    color: ${({ theme: {colors}}) => colors.label};
    font-size: 14px;
    font-style: italic;
    text-align: center;
    margin: 5px;
`;