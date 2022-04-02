import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin: 10px 0;
    color: ${({theme: {colors}}) => colors.text};
`;

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    border-left: 4px solid ${(props) => props.color};
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 5px 0 5px 15px;
    margin-left: 10px;
`;

export const LabelNumbers = styled.span`
    font-weight: bold;
    margin-bottom: 10px;
    font-style: italic;
`;

export const LabelGame = styled.span`
    margin-right: 15px;
    font-weight: bold;
    font-style: italic;
    color: ${(props) => props.color};
`;

export const Touchable = styled.button<any>`
    border: 0;
    cursor: pointer;
    background-color: transparent;
    color: ${({theme: {colors}}) => colors.label};
`;

export const LabelPrice = styled.span``;