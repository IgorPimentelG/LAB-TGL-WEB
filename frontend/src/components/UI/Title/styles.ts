import styled from 'styled-components';

export const Text = styled.h2`
    color: ${({theme: {colors}}) => colors.text};
    font-style: italic;
    margin: 15px;

    @media(max-width: 310px) {
        text-align: center;
    }
`;