import React from 'react';
import { Container } from './styles';

const Card: React.FC<{ shadow: boolean }> = (props) => {
    return(
        <Container shadow={props.shadow}>
            {props.children}
        </Container>
    );
}

export default Card;