import React from 'react';
import ReactDOM from 'react-dom';
import ItemBet from '../ItemBet';
import { Card } from '@components/Layout';
import { IDataModal } from '@shared/model/interfaces/modelData';
import { useSearchConfigGame } from '@hooks/useSearchConfigGame';
import { Container, ContainerCard, ContainerOptions, Touchable, Title, Label } from './styles';

const ModalConfirm: React.FC<{ data: IDataModal }> = ({ data }) => {

    const game = useSearchConfigGame(data.bet ? data.bet.game_id : 0);

    return(
        <Container data-cy='modal'>
            <Card shadow={true}>
               <ContainerCard>
                    <Title>{data.title}</Title>

                    { data.text && <Label>{data.text}</Label> }

                    { data.bet &&
                        <ItemBet data={{
                            showIcon: false,
                            color: game.color,
                            price: game.price,
                            type: game.type,
                            numbers: data.bet.numbers,
                            onRemove: () => {}
                        }}/>
                    }
                    
                    <ContainerOptions>
                        <Touchable color='#FF6347' onClick={data.onCancel} data-cy='button-cancel'>
                            Cancelar
                        </Touchable>
                        <Touchable 
                            data-cy='button-confirm'
                            color='#27C383'
                            onClick={data.onConfirm}
                        >
                            Confirmar
                        </Touchable>
                    </ContainerOptions>
               </ContainerCard>
            </Card>
        </Container>
    );

}

const Modal: React.FC<{ data: IDataModal }> = ({ data }) => {

    const portalModal = document.getElementById('portal-modal');

    return(
        <React.Fragment>
            {ReactDOM.createPortal(<ModalConfirm data={data}/>, portalModal!)}
        </React.Fragment>
    );
}

export default Modal;