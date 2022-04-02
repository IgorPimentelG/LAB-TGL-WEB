import React from 'react';
import PublicRouter from './public.router';
import PrivateRouter from './private.router';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

const Router = () => {

    const isAuthenticated = useSelector<RootState>((state) => state.auth.isAuthenticated);

    return(
        <React.Fragment>
          {!isAuthenticated && <PublicRouter/>}
          {isAuthenticated && <PrivateRouter/>}
        </React.Fragment>
    );
}

export default Router;

