import React from 'react';
import ReactDOM from 'react-dom';
import Logo from '@components/Logo';
import { Container, Spinner } from './styles';

const LoadingComponent = () => {
    return(
        <Container>
            <Logo/>
            <Spinner/>
        </Container>
    );
}

const Loading = () => {

    const portal = document.getElementById('portal-loading');

    return(
        <React.Fragment>
            {ReactDOM.createPortal(<LoadingComponent/>, portal!)}
        </React.Fragment>
    );
}

export default Loading;