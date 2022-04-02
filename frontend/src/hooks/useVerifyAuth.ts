import { PATH_HOME, PATH_NEW_BET, PATH_ACCOUNT } from '@constants/pathnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '@store/auth/authSlice';
import { useLocation } from 'react-router-dom';

const useVerifyAuth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = authActions;
  
  const verify = () => {

    const user = JSON.parse(localStorage.getItem('user')!);
    const token = JSON.parse(localStorage.getItem('token')!);

    if( user && token ) {
      const expired = new Date(Date.parse(token['expires_at']));
      
      if(new Date() < expired) {
        
        dispatch(login({user, token}));

        if( location.pathname === '/' || location.pathname === PATH_HOME || 
            location.pathname === PATH_NEW_BET || location.pathname === PATH_ACCOUNT) {
          navigate('/home');
        }
      } else {
        localStorage.clear();
      }
    }
  }

  return { verify };
}

export { useVerifyAuth };