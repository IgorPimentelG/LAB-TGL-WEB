import { FiTrash2 } from 'react-icons/fi';
import { IItemCart } from "@shared/model/interfaces/cart";
import { Container, Content, LabelNumbers, LabelGame, LabelPrice, Touchable } from "./styles";

const ItemBet: React.FC<{ data: IItemCart }> = ({ data }) => {

    const priceFormt = data.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const numbersFormat = [...data.numbers]
    .sort((num1, num2) => num1 - num2)
    .map((item) => item < 10 ? `0${item}` : `${item}`);

    return(
        <Container>
          { data.showIcon &&
            <Touchable onClick={data.onRemove} data-cy='button-remove-item'>
                <FiTrash2 size={20}/>
            </Touchable>
            }
            <Content color={data.color}>
                <LabelNumbers>{numbersFormat.join(', ')}</LabelNumbers>
                <div>
                    <LabelGame color={data.color}>{data.type}</LabelGame>
                    <LabelPrice>{priceFormt}</LabelPrice>
                </div>
            </Content>
        </Container>
    );

}
export default ItemBet;