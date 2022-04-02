import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    flex-direction: row;
    padding: 0 100px;
    border-bottom: 2px solid ${({theme: {colors}}) => colors.border};
    position: relative;
    top: 0;

    @media(max-width: 480px) {
        flex-direction: column;
    }
`;

export const ContainerLogo = styled.div`
    position: relative;
    bottom: -3px;

    @media(max-width: 480px) {
        display: flex;
        width: 100%;
        position: none;
        bottom: none;
        justify-content: center;
        margin-bottom: 15px;

    }
`;

export const Menu = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-left: 50px;
    
    & a { 
        text-decoration: none;
    };

    @media(max-width: 530px) {
        margin-left: 5px;
    };

    @media(max-width: 480px) {
        justify-content: center;
    }
`;

export const MenuRight = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;

    @media(max-width: 480px) {
        justify-content: center;
    }
`;

export const MenuLeft = styled(MenuRight)`
    justify-content: flex-start;

    @media(max-width: 480px) {
        justify-content: flex-end;
    }
`;

export const OptionMenu = styled.span`
    display: inline-flex;
    align-items: center;
    margin-left: 20px;
    font-weight: bold;
    font-style: italic;
    color: ${({theme: {colors}}) => colors.text};

    &:hover {
        color: ${({theme: {colors}}) => colors.label};
    }

    @media(max-width: 480px) {
       margin: 5px;
       display: flex;
    }
`;

