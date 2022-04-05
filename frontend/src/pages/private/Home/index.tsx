import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { user } from '@shared/services'
import { FaFrown } from 'react-icons/fa';
import { RootState } from '@store/index';
import { Bet } from '@shared/model/types/bet';
import { useNavigate } from 'react-router-dom';
import { User } from '@shared/model/types/user';
import { FiArrowDownCircle } from 'react-icons/fi';
import { authActions } from '@store/auth/authSlice';
import { useSwitchGame } from '@hooks/useSwtichGame';
import { Header, CardGame } from '@components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { TypeButton } from '@shared/model/enums/typeButton';
import { Head, Title, Button, ButtonGame } from '@components/UI';
import { useSort } from '@hooks/useSort';
import { 
    Container, 
    ContainerBets, 
    ContainerButton, 
    ContainerOptions, 
    ContainerWarning ,
    ContainerIcon,
    ContainerTypesGames,
    ContainerFilter,
    Label
} from './styles';

const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { account } = user();
    const { sortBets } = useSort();
    const { addBets } = authActions;
    const { getConfig, typeSelected } = useSwitchGame(false);
    const containerBetsRef = useRef<HTMLDivElement>(null);

    const bets: Bet[] = useSelector<RootState, User>((state) => state.auth.user).bets!;

    const [betsFilter, setBetsFilter] = useState<Bet[]>([]);
    const [showIconScroll, setShowIconScroll] = useState(false);


    // Obter jogos do usuário
    useEffect(() => {
        if( bets.length === 0 ) {
            const response = account();
            toast.promise(response, {
                pending: 'Carregando apostas',
                error: 'Houve um error ao carregar suas apostas'
            });
    
           response.then(({data}) => {
               dispatch(addBets({bets: data.bets}));
           });
        }
    }, []);

    // Gerar filtros
    useEffect(() => {
        setShowIconScroll(false);
        if( bets.length > 0 ) {
            let filter = [];
            if( typeSelected.length === 0 ) {
               filter = [...bets];
            } else {
                const gamesActivesID = typeSelected.map((item) => item.id);
                filter = bets.filter((bet) => {
                    const index =  gamesActivesID.indexOf(bet.game_id);
                    if( index !== -1 ) {
                        return bet;   
                    }
                });
            }
            setBetsFilter(filter.sort(sortBets));
        }
    }, [bets, typeSelected]);

    useEffect(() => {
        setShowIconScroll(() => betsFilter.length > 3 ? true : false);
    }, [betsFilter]);

    const handlerNewBet = () => {
        navigate('/new-bet');
    }

    const onContainerBetsScroll = () => {
        const scrollTop = containerBetsRef.current!.scrollTop;
        setShowIconScroll(() =>  scrollTop <= 10 ? true : false);
    }

    return(
        <React.Fragment>
            <Header/>
            <Head name="Home"/>
            <Container>
                <ContainerOptions>

                    <ContainerTypesGames>
                        <Title>RECENT GAMES</Title>
                        <Label>Filters</Label>
                        <ContainerFilter>
                            {getConfig().map((config, index) => (
                                <ButtonGame key={index} config={config}/>
                            ))}
                        </ContainerFilter>
                    </ContainerTypesGames>

                    <ContainerButton>
                        <div>
                            <Button
                                config={{
                                    label: 'New Bet',
                                    type: TypeButton.CONFIRM,
                                    arrowRight: true,
                                    nav: true,
                                    onClick: handlerNewBet
                                }}
                            />
                        </div>
                    </ContainerButton>
                </ContainerOptions>
                
                <ContainerBets ref={containerBetsRef} onScroll={onContainerBetsScroll} data-cy='container-bets'>
                    {betsFilter.length === 0 && 
                        <ContainerWarning data-cy='container-warning'>
                            <Label>Nenhuma aposta realizada</Label>
                            <FaFrown color='#9D9D9D'/>
                        </ContainerWarning>
                    }
                    {betsFilter.length > 0 && betsFilter.map((item, index) => (
                        <CardGame key={index} data={{
                             gameId: item.game_id,
                             price: item.price,
                             date: item.created_at,
                             numbers: item.choosen_numbers, 
                         }} />
                     )
                    )}
                </ContainerBets>
                
               {showIconScroll && 
                    <ContainerIcon>
                        <FiArrowDownCircle size={20}/>
                    </ContainerIcon>
                }
            </Container>
        </React.Fragment>
    );
}

export default Home;