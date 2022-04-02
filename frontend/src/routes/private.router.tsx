import NotFound from '@pages/public/NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Account, NewBet } from '@pages/private';
import { PATH_NOT_FOUND, PATH_HOME, PATH_NEW_BET, PATH_ACCOUNT } from '@constants/pathnames';

const PrivateRouter = () => {
    return( 
        <Routes>
            <Route path='/*' element={<Navigate to='/home'/>}/>
            <Route path={PATH_HOME} element={<Home/>}/>
            <Route path={PATH_NEW_BET} element={<NewBet/>}/>
            <Route path={PATH_ACCOUNT} element={<Account/>}/>
            <Route path={PATH_NOT_FOUND} element={<NotFound/>} />
            <Route path='*' element={<Navigate to='/404'/>}/>
        </Routes>  
    );
}

export default PrivateRouter;