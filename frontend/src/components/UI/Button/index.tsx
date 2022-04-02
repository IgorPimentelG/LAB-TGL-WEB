import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { Touchable, Container } from "./styles";
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { ConfigButton } from '@shared/model/types/configForm';

const Button: React.FC<{config: ConfigButton }> = ({ config }) => {

    const { label, nav, onClick, type, arrowLeft, arrowRight } = config;
    const isEnabled = useSelector<RootState>((state) => state.loading.isLoading);

    return(
        <Touchable
            {...(nav  ? {onClick: onClick} : {})} 
            type={type}
            data-cy={`button-${label.toLowerCase().replace(/\s/g, '')}`}
            disabled={isEnabled}
        >
            <Container>
                {arrowLeft && <FiArrowLeft/>}
                {label}
                {arrowRight && <FiArrowRight/>}
            </Container>
        </Touchable>
    );
}

export default Button;