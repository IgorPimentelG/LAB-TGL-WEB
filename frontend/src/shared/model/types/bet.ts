export type Bet = {
    choosen_numbers: string;
    user_id: number;
    game_id: number;
    price: number;
    name?: string;
    created_at: string;
    updated_at: string;
    id: number;
}

export type NewBetCart = {
    idBet: number;
    game_id: number;
    numbers: number[];
}

