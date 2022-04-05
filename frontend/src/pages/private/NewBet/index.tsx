import React, { useEffect, useRef, useState } from 'react';
import Modal from '@components/Layout/Modal';
import ItemBet from '@components/Layout/ItemBet';
import { toast } from 'react-toastify';
import { RootState } from '@store/index';
import { beats } from '@shared/services';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@util/formatPrice';
import { useKeyboard } from '@hooks/useKeyboard';
import { Card, Header } from '@components/Layout';
import { NewBetCart } from '@shared/model/types/bet';
import { GameStore } from '@shared/model/types/game';
import { useSwitchGame } from '@hooks/useSwtichGame';
import { useDispatch, useSelector } from 'react-redux';
import { Head, Title, ButtonGame,  ButtonKeyboard } from '@components/UI';
import { FiShoppingCart, FiArrowRight, FiArrowDownCircle } from 'react-icons/fi';
import { authActions } from '@store/auth/authSlice';
import { 
    Main, 
    Text,
    Label, 
    LabelType,
    ButtonSave,
    LabelTotal,
    LabelButton, 
    ButtonOption,
    Container, 
    ContainerCart, 
    ContainerCard, 
    ContainerKeyoard,
    ContainterOptions,
    ContainerIconScroll,
    ContainerTypesGames,
    ContainerButtonOptions
} from './styles';


const NewBet = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newBet: saveNewBet } = beats();
    const { getConfig, typeSelected: typeGame } = useSwitchGame(true);
    const { addBets } = authActions;

    const [newBet, setNewBet] = useState<number[]>([]);
    const [bets, setBets] = useState<{cart: NewBetCart[], total: number}>({ cart: [], total: 0 });
    const [showIconScroll, setShowIconScroll] = useState<boolean>(false);
    const [showModalConfirmSave, setShowModalConfirmSave] = useState(false);
    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<{show: boolean, id: number}>();
    
    const containerKeyboardRef = useRef<HTMLDivElement>(null);
    const containerCartRef = useRef<HTMLDivElement>(null);
    const gamesRules = useSelector<RootState, GameStore>((state) => state.gamesTypes);

    const typeSelected = typeGame[0] ? typeGame[0] : {
        id: 0,
        type: '',
        description: '',
        range: 0,
        price: 0,
        color: '',
        'max_number': 0
    };

    // Configurar nova aposta
    useEffect(() => {
        handlerClearGame();
        {typeSelected.range > 30 && containerKeyboardRef.current!.scrollIntoView({behavior: 'smooth'});}
    }, [typeSelected]);

    // Configurar icone do scroll no carrinho
    useEffect(() => {
        if(bets.cart.length > 3) {
            setShowIconScroll(true);
        } else {
            setShowIconScroll(false);
        }
    }, [bets]);

    const handlerClearGame = () => {
        setNewBet([]);
    }

    const handlerCompleteGame = () => {
        let rest = typeSelected.max_number - newBet.length;
        const numbersSorted: number[] = [];
        
        while( rest !== 0 ) {
            while( true ) {
                let number = Math.floor(Math.random() * typeSelected.range) + 1;

                if(newBet.indexOf(number) === -1 && numbersSorted.indexOf(number) === -1) {
                    numbersSorted.push(number);
                    break; 
                }
            }
            rest--;
        }

        setNewBet((state) => [...state, ...numbersSorted]);
    }

    const handlerAddToCart = () => {
       if( newBet.length === typeSelected.max_number ) {
            const bet = {
                idBet: Date.now(),
                game_id: typeSelected.id, 
                numbers: newBet
            }

            setBets((state) => ({
                cart: [...state.cart, bet],
                total: state.total + typeSelected.price
            }));
            handlerClearGame();
            {typeSelected.range > 30 && containerCartRef.current!.scrollIntoView({behavior: 'smooth'})};
        } else {
            const remainingNumbers =  typeSelected.max_number - newBet.length;
            
            let mensagem = '';
            if( remainingNumbers === 1 ) {
                mensagem = 'Falta 1 número no seu jogo';
            } else {
                mensagem = `Faltam ${remainingNumbers} números no seu jogo`;
            }

            toast.warning(`${mensagem}`);
        }
    }

    const handlerSave = () => {
         if( bets.total <= gamesRules.min_cart_value ) {
            toast.warning(
                `Valor total mínimo é acima de ${formatPrice(gamesRules.min_cart_value)} para salvar os jogos.
                 Faltam ${formatPrice((gamesRules.min_cart_value - bets.total) + 1)} em jogos`
            );
        } else {
            setShowModalConfirmSave(true);
        } 
    }
    
    const handlerRemove = (idBet: number) => {
        setShowModalConfirmDelete({id: idBet, show: true});
    }

    const handlerCancelModalDelete = () => {
        setShowModalConfirmDelete({id: 0, show: false});
        console.log('remove');
    }

    const handlerConfirmModalDelete = () => {
        const game_id = bets.cart.filter((item) => item.idBet === showModalConfirmDelete?.id)[0].game_id;
        const total = bets.total - gamesRules.types.filter((item) => item.id === game_id)[0].price;
        const cart = bets.cart.filter((item) => item.idBet !== showModalConfirmDelete?.id);
        setBets({ cart, total });
        handlerCancelModalDelete();
    }

    const handlerCancelModalSave = () => {
        setShowModalConfirmSave(false);
    }

    const handlerConfirmModalSave = () => {
        const response = saveNewBet(bets.cart.map((item) => 
            ({ game_id: item.game_id, numbers: item.numbers })
        ));

        toast.promise(response, {
            pending: 'Salvando seus jogos',
            success: 'Jogos salvos com sucesso!',
        });

        handlerCancelModalSave();

        response.then(({data}) => {
            dispatch(addBets({bets: data.bet}));
            handlerClearGame();
            setBets({ cart: [], total: 0 });
            navigate('/home');
        }).catch((error) => {
            toast.error(error.message);
        });
    }

    const addNumber = (value: number) => {
        if( newBet.length === typeSelected.max_number ) {
            toast.error(`Todos os ${typeSelected.max_number} já foram selecionados`);
        } else {
            setNewBet((state) => [...state, value]);
        }
    }

    const removeNumber = (value: number) => {
        setNewBet((state) => state.filter((item) => item !== value));
    }

    const handlerScrollCart = () => {
        const scrollTop = containerCartRef.current!.scrollTop;

        if(scrollTop <= 10) {
            setShowIconScroll(true);
        } else {
            setShowIconScroll(false);
        }
    }

    const { getKeyboard } = useKeyboard({
        numbersActive: newBet,
        onAdd: addNumber,
        onRemove: removeNumber
    });

    return(
       <React.Fragment>
            <Header/>
            <Head name='New Bet'/>
            {showModalConfirmDelete?.show && 
                <Modal data={{
                    title: 'Deseja remover o jogo?',
                    bet: bets.cart.filter((item) => item.idBet === showModalConfirmDelete.id)[0],
                    onCancel: handlerCancelModalDelete,
                    onConfirm: handlerConfirmModalDelete
                }}/>
            }
             {showModalConfirmSave && 
                <Modal data={{
                    title: 'Deseja realmente concluír os seus jogos?',
                    text: `Seus jogos tem o valor total de ${formatPrice(bets.total)}`,
                    onCancel: handlerCancelModalSave,
                    onConfirm: handlerConfirmModalSave
                }}/>
            }
            <Main>
                <Container>
                    <Title>NEW BET <LabelType>FOR {typeSelected.type}</LabelType></Title>
                    
                    <Label>Choose a game</Label>
                    <ContainerTypesGames>
                        {getConfig().map((config, index) => (
                            <ButtonGame key={index} config={config}/>
                        ))}
                    </ContainerTypesGames>

                    <Label>Fill your bet</Label>
                    <Text>{typeSelected.description}</Text>

                    <ContainerKeyoard ref={containerKeyboardRef}>
                        {getKeyboard(typeSelected.range).map((config) => (
                            <ButtonKeyboard key={config.label} config={{...config, color: typeSelected.color}}/>
                        ))}
                    </ContainerKeyoard>
                    
                    <ContainterOptions>
                        <ContainerButtonOptions>
                            <ButtonOption reverser={false} onClick={handlerCompleteGame} data-cy='button-complete-game'>
                                <span>Complete game</span>
                            </ButtonOption>
                            <ButtonOption reverser={false} onClick={handlerClearGame} data-cy='button-clear-game'>
                                <span>Clear game</span>
                            </ButtonOption>
                        </ContainerButtonOptions>
                        <ContainerButtonOptions>
                            <ButtonOption reverser={true} onClick={handlerAddToCart} data-cy="button-add-cart">
                                <LabelButton>
                                    <FiShoppingCart style={{marginRight: 5}}/> Add to cart
                                </LabelButton>
                            </ButtonOption>
                        </ContainerButtonOptions>
                    </ContainterOptions>   
                </Container>

                <Container>
                    <ContainerCard>
                        <Card shadow={false}>
                            <Title>CART</Title>

                            <ContainerCart ref={containerCartRef} onScroll={handlerScrollCart} data-cy='container-cart'>
                                {bets.cart.length === 0 && <Text>Carrinho vazio</Text>}
                                {bets.cart.length !== 0 &&
                                    bets.cart.map((item, index) => {
                                        const gameType = gamesRules.types.filter((game) => game.id === item.game_id)[0];
                                        return (<ItemBet key={index} data={{
                                            numbers: item.numbers,
                                            type: gameType.type,
                                            price: gameType.price,
                                            color: gameType.color,
                                            showIcon: true,
                                            onRemove: handlerRemove.bind(null, item.idBet)
                                        }}/>
                                    )}
                                )}
                            </ContainerCart>
                            {showIconScroll  && 
                                <ContainerIconScroll>
                                    <FiArrowDownCircle size={20}/>
                                </ContainerIconScroll>
                            }

                            <Title>CART <LabelTotal>
                               TOTAL: {formatPrice(bets.total)}
                            </LabelTotal></Title>

                            <ButtonSave onClick={handlerSave}>
                                <LabelButton data-cy='button-save'>
                                    Save <FiArrowRight/>
                                </LabelButton>
                            </ButtonSave>
                        </Card>

                    </ContainerCard>
                </Container>
            </Main>
       </React.Fragment>
    );
}

export default NewBet;