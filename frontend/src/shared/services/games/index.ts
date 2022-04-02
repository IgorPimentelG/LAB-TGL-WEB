import { IListGamesResponse } from './../../model/interfaces/responses';
import api from '@shared/services/api/axios.config';

const games = () => {

    const listGames = async (): Promise<IListGamesResponse> => {
        return api.get('/cart_games');
    }

    return { listGames };
}

export default games;