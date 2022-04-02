import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { RootState } from '@store/index';
import { games } from '@shared/services';
import { Game } from '@shared/model/types/game';
import { useSelector, useDispatch } from 'react-redux';
import { gamesActions } from '@store/games/gamesSlice';

const useSwitchGame = (required: boolean) => {

    const dispatch = useDispatch();
    const { listGames } = games();
    const { add } = gamesActions;
    const [typeSelected, setTypeSelected] = useState<Game[]>([]);
    const typesGames: Game[] = useSelector<RootState, Game[]>((state) => state.gamesTypes.types);
    
    useEffect(() => {
        const getGames = async () => {
            try {
                const response = await listGames();
                const data = response.data;
                dispatch(add({ types: data.types, min_cart_value: data.min_cart_value }));
            } catch(error: any) {
                toast.error(`${error.message}`);
            }
        }
        
        // Verificar se os dados já foram carregados
        if(typesGames.length === 0) {
            getGames();
        }
    }, []);

    // Auto seleciona o primeiro tipo, quando requerido
    useEffect(() => {
        if( required && typesGames.length > 0 ) {
            setTypeSelected(() => [typesGames[0]]);
        }      
    }, [typesGames]);

    const onChange = (game: Game) => {
        setTypeSelected((state) => {
            if( !required ) {
                const isActive = state.findIndex((item) => item.id === game.id);    
                if( isActive === -1 ) {
                    return [...state, game ];
                } else {
                    state.splice(isActive, 1);
                    return [...state];
                }
            } else {
                return [game];
            }
        });
    }

    const getConfig = () => {
        return typesGames.map((item) => {
            return {
                id: item.id,
                name: item.type,
                color: item.color,
                active: (typeSelected!.some((itemSelected) => itemSelected.id === item.id)),
                onClick: onChange.bind(null, item)
            }
        });
    }

    return { getConfig, typeSelected };
};

export { useSwitchGame }
