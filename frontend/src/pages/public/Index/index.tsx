import 'react-toastify/dist/ReactToastify.css';
import { RouteObject, Navigate, useRoutes } from 'react-router-dom';
import { Main, Container, Title, Text, HighlightedText } from "./styles";
import { SignIn, SignUp, ResetPassword, ChangePassword } from '@components/Forms';
import { PATH_SIGN_IN, PATH_SIGN_UP, PATH_RESET_PASSWORD } from '@constants/pathnames';

const Index = () => {

    const routes: RouteObject[] = [
        { path: `${PATH_SIGN_IN}`, element: <SignIn/> },
        { path: `${PATH_SIGN_UP}`, element: <SignUp/> },
        { path: `${PATH_RESET_PASSWORD}`, element: <ResetPassword/> },
        { path: `${PATH_RESET_PASSWORD}/:token`, element: <ChangePassword/>},
        { path: '*', element: <Navigate to='/404'/>}
    ];

    const router = useRoutes(routes);

    return(
        <Main>
            <Container>
                <Text>{`The \nGreatest \nApp`}</Text>
                <HighlightedText>for</HighlightedText>
                <Title>Lottery</Title>
            </Container>
            <Container>{router}</Container>
        </Main>
    );
}

export default Index;