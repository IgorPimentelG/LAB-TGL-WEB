import React from 'react';
import MyAccount from '@components/Forms/MyAccount';
import { Head } from '@components/UI';
import { Header } from '@components/Layout';
import { FaUserCircle } from 'react-icons/fa';
import { ContainerIcon, Container, Main } from './styles';

const Account = () => {
    return(
       <React.Fragment>
           <Head name='Account'/>
           <Header/>

           <Main>
                <Container>
                    <ContainerIcon>
                        <FaUserCircle size={60} color='#B5C401'/>
                    </ContainerIcon>

                    <MyAccount/>
                </Container>
           </Main>
       </React.Fragment>
    );
}

export default Account;