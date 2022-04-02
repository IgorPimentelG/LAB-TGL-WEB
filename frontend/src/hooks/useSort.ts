import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import { Bet } from '@shared/model/types/bet';
import { Game } from '@shared/model/types/game';

const useSort = () => {

    const games = useSelector<RootState, Game[]>((state) => state.gamesTypes.types);
    const searchName = (id: number): string => games.filter((item) => item.id === id)[0].type;

    const sortBets = (betA: Bet, betB: Bet): number => {
        const gameNameA =  searchName(betA.game_id);
        const gameNameB = searchName(betB.game_id);

        if( gameNameA < gameNameB ) {           // A vem antes que B
            return -1;
        } else if( gameNameA > gameNameB ) {    // A vem depois que B
            return 1;
        } else {                                // São iguais
            return 0;
        }
    }

    return { sortBets };
}

export { useSort }