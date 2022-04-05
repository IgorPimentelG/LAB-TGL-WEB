export type Game = {
    id: number;
    type: string;
    description: string;
    range: number;
    price: number;
    color: string;
    'max_number': number;
};

export type ConfigGame = {
    id: number;
    name: string;
    color: string;
    active: boolean;
    onClick: () => void;
};

export type ItemListGame = {
    gameId: number;
    date: string;
    price: number;
    numbers: string;
};

export type GameStore = {
    min_cart_value: number;
    types: Game[];
}