import React from 'react';
import { ThemeProvider } from 'styled-components';

const defaultTheme = {
    colors: {
        green: '#B5C401',
        greenDark: '#27C383',
        label: '#9D9D9D',
        buttonNumber: '#ADC0C4',
        text: '#707070',
        border: '#EBEBEB',
        link: '#C1C1C1',
        invalid: '#FF6B35'
    },
    view: {
        height: '100vh'
    },
}

const Theme: React.FC = ( props ) => {
    return(
        <ThemeProvider theme={defaultTheme}>
            {props.children}
        </ThemeProvider>
    );
}

export default Theme;
