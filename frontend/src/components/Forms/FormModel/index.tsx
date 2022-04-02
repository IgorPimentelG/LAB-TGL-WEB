import React, { useEffect } from 'react';
import { Head, Input, Title, Button } from '@components/UI';
import { Card } from '@components/Layout';
import { Link } from 'react-router-dom';
import { ConfigForm } from '@shared/model/types/configForm';
import { Form, Main, ContainerLink, TextLink } from './styles';
import { useMonitorError } from '@hooks/index';

const FormModel: React.FC<{ data: ConfigForm }> = ({ data }) => {

    const { monitorError } = useMonitorError(...Object.values(data.errors));

    useEffect(() => {
        monitorError();
    }, [data.errors]);

    return(
        <Main>
            <Head name={data.titlePage}/>

            <Title>{data.label}</Title>

            <Card shadow={true}>
                <Form onSubmit={data.onSubmit(data.btnConfirm.onClick)}>
                    {data.inputs.map((item, index) => (
                        <Input
                            key={index}
                            config={{
                                ...item,
                                index: index,
                            }}
                        />
                     ))
                    }
                    { data.link &&   
                        <ContainerLink>
                            <Link to={data.link.path} >
                                <TextLink>{data.link.label}</TextLink>
                            </Link>
                        </ContainerLink>
                    }
                    <Button config={data.btnConfirm} />
                </Form>
            </Card>

            {data.btnNav && <Button config={data.btnNav}/>}
        </Main>
    );
}

export default FormModel;