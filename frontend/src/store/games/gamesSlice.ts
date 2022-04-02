import { createSlice } from '@reduxjs/toolkit';
import { GameStore } from '@shared/model/types/game';

const initialState: GameStore = {
    min_cart_value: 0,
    types: []
}

const GamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        add(state, action) {
            return {
                min_cart_value: action.payload.min_cart_value,
                types: [...state.types, ...action.payload.types]
            }
        }
    }
});

export const gamesActions = GamesSlice.actions;
export default GamesSlice;