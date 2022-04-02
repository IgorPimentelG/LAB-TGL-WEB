import { Game } from '@shared/model/types/game';
import { Token, User } from '@shared/model/types/user';
import { Bet } from '@shared/model/types/bet';

export interface IAuthResponse {
    data: {
        user: User;
        token: Token;
    };
    status: number;
}

export interface IListGamesResponse {
    data: {
        min_cart_value: number;
        types: Game[];
    };
    status: number;
}  

export interface INewBetResponse {
    data: {
        bet: Bet[];
    }
}

export interface IUserResponse {
    data: {
        user: User;
    }
    status: number;
}