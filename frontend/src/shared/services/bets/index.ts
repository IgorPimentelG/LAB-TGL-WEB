import { INewBetResponse } from './../../model/interfaces/responses';
import api from '@shared/services/api/axios.config';

const beats = () => {

    const listBet = async () => {
        return api.get('/bet/all-bets');
    }

    const newBet = async (bets: object[]): Promise<INewBetResponse> => {
        return api.post('/bet/new-bet', JSON.stringify({ games: bets }));
    }

    return { listBet, newBet };
}

export default beats;