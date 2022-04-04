import Card from '@components/Layout/Card';
import Logo from '@components/Logo';
import Button from '@components/UI/Button';
import Head from '@components/UI/Head';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import { TypeButton } from '@shared/model/enums/typeButton';
import { Main, Title, Container, Contents, ContainerLogo } from './styles';

const NotFound = () => {

    const navigate = useNavigate();
    
    const onBackHandler = () => {
        navigate('/');
    }

    return(
        <Main>
            <Head name="Page Not Found"/>
            
            <ContainerLogo>
                <Logo/>
            </ContainerLogo>

            <Card shadow={true}>
                <Container>
                    <Contents>
                        <FiAlertTriangle size={60} color='#707070'/>
                        <Title data-cy='text-title'>Page Not Found</Title>
                    </Contents>

                    <Button config={{
                        label: 'Back',
                        type: TypeButton.CONFIRM,
                        arrowLeft: true,
                        nav: true,
                        onClick: onBackHandler
                    }}/>
                </Container>
            </Card>
        </Main>
    );
}

export default NotFound;