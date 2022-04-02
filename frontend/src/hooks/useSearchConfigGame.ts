import { Game } from '@shared/model/types/game';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

const useSearchConfigGame = (id: number): Game => {
    const games = useSelector<RootState, Game[]>((state) => state.gamesTypes.types);
    return games.filter((game) => game.id === id)[0];
}

export { useSearchConfigGame };