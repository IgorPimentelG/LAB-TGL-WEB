import { Bet } from './bet';

export type Token = {
    type: string;
    token: string;
    expires_at: string;
}

export type User = {
    id: number;
    email: string;
    name: string;
    token?: (string | null);
    picture?: (string | null);
    is_admin: number;
    token_created_at?: (string | null);
    created_at: string;
    updated_at: string;
    bets?: Bet[];
}

export type DataChangePassword = {
    password: string;
    token: string;
}

export type UpdateAccount = {
    name: string;
    email: string;
}

