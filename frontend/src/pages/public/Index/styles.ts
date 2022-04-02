import styled from 'styled-components';

export const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
    
    @media(max-width: 600px) {
        flex-direction: column;
        height: ${({ theme: {view}}) => view.height};
    }
`;

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0 100px;
    justify-items: center;
    align-items: center;
    text-align: center;

    @media(max-width: 800px) {
        margin: 0 30px;
    }

    @media(max-width: 600px) {
        margin: 10px;
    }
`;

export const Title = styled.h1`
    margin: 0;
    color: ${({ theme: {colors}}) => colors.text};
    font-size: 55px;
    font-style: italic;
    text-transform: uppercase;

    @media(max-width: 400px) {
        font-size: 40px;
    }
`;

export const Text = styled(Title)`
    font-size: 50px;
    text-transform: capitalize;
    white-space: pre-line;

    @media(max-width: 400px) {
        font-size: 35px;
    }
`;

export const HighlightedText = styled.h4`
    color: #FFF;
    font-style: italic;
    background-color: ${({ theme: {colors}}) => colors.green};
    border-radius: 15px;
    padding: 5px 40px;
    margin-bottom: 10px;
`;

