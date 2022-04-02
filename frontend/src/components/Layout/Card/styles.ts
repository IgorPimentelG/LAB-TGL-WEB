import styled from 'styled-components';

export const Container = styled.div<any>`
    background-color: #FFF;
    border: 1px solid ${({theme: {colors}}) => colors.border};
    border-radius: 10px;
    box-shadow: ${(props) => props.shadow ? '10px 10px 50px 10px #00000014' : ''};
    width: min-content;
`;