import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 10px;
    padding: 5px 0;
`;

export const LabelNumbers = styled.p`
    color: ${({theme: {colors}}) => colors.text};
    font-weight: bold;
    font-style: italic;
    margin: 0;
`;

export const LabelInfo = styled.p`
    color: ${({theme: {colors}}) => colors.text};
    font-size: 14px;
    margin: 10px 0;
`;

export const LabelType = styled.p`
    font-weight: bold;
    font-style: italic;
    color: ${(props) => props.color};
    margin: 0;
`;

export const Bar = styled.div`
    border: 3px solid ${(props) => props.color};
    border-radius: 20px;
`;


