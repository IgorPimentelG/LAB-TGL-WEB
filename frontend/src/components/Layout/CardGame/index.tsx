import React from 'react';
import { formatPrice } from '@util/formatPrice';
import { ItemListGame } from '@shared/model/types/game';
import { useSearchConfigGame } from '@hooks/useSearchConfigGame';
import { Container, LabelNumbers, Bar, Content, LabelInfo, LabelType } from './styles';

const CardGame: React.FC<{ data: ItemListGame }> = React.memo(
    ({ data }) => {

        const configGame = useSearchConfigGame(data.gameId);
        
        const dateFormat = new Date(Date.parse(data.date)).toLocaleString('en-GB').split(',')[0];
        const priceFormat = formatPrice(data.price);
        const numbersFormat = data.numbers.split(',').map((item) => `${Number(item) <= 9 ? '0' : ''}${item}`);
          
        return(
            <Container data-cy='card-game'>
                <Bar color={configGame.color}/>
                <Content>
                    <LabelNumbers>{numbersFormat.join(', ')}</LabelNumbers>
                    <LabelInfo>{dateFormat} - ({priceFormat})</LabelInfo>
                    <LabelType color={configGame.color} data-cy='type-game'>{configGame.type}</LabelType>
                </Content>
            </Container>
        );
    }
);

export default CardGame;