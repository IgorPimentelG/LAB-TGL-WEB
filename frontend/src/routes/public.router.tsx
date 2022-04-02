import Index from '@pages/public/Index';
import NotFound from '@pages/public/NotFound';
import { PATH_NOT_FOUND } from '@constants/pathnames';
import { Routes, Route, Navigate } from 'react-router-dom';

const PublicRouter = () => {
    return(
        <Routes>
            <Route path='/' element={ <Navigate to='/sign-in'/> }/>
            <Route path='/*' element={ <Index/> }/>  
            <Route path={PATH_NOT_FOUND} element={ <NotFound/> }/>              
        </Routes>
    );
}

export default PublicRouter;