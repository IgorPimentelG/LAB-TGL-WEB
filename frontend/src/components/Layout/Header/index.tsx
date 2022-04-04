import Logo from "@components/Logo";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { authActions } from '@store/auth/authSlice';
import { Container, ContainerLogo, Menu, MenuLeft, MenuRight, OptionMenu } from "./styles";

const Header = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const { logout } = authActions;

    const handlerLogout = () => {
        localStorage.clear();
        dispatch(logout());
    }

    return(
        <Container>
            <ContainerLogo>
                <Logo/>
            </ContainerLogo>

            <Menu>
               {(location.pathname !== '/home') && 
                    <MenuLeft>
                        <Link to='/home'><OptionMenu>Home</OptionMenu></Link>
                    </MenuLeft>
                }
                <MenuRight>
                   {location.pathname !== '/account' && <Link to='/account'><OptionMenu>Account</OptionMenu></Link>}
                    <Link to='/' onClick={handlerLogout} data-cy='logout'>
                        <OptionMenu>Logout <FaArrowRight style={{marginLeft: 10}}/></OptionMenu>
                    </Link>
                </MenuRight>
            </Menu>
        </Container>
    );
}

export default Header;