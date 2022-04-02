import { User, Token } from '@shared/model/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialStateAuth {
    user: User,
    token: Token,
    isAuthenticated: boolean;
}

const initialState: IInitialStateAuth = {
    user: {
        id: 0,
        email: '',
        name: '',
        token: null,
        'is_admin': -1,
        'token_created_at': null,
        'created_at': '',
        'updated_at': '',
        bets: []
    },
    token: {
        type: '',
        token: '',
        'expires_at': ''
    },
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

        login(_state, action) {
            return {
                isAuthenticated: true,
                token: action.payload.token,
                user: {
                    bets: [],
                    ...action.payload.user
                }
            }
        },

        addBets(state, action) {
            return {
                user: {
                    ...state.user,
                    bets: [...state.user.bets!, ...action.payload.bets]
                },
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }
        },

        updateUser(state, action) {
            return {
                user: {
                    ...state.user,
                    name: action.payload.name,
                    email: action.payload.email,
                },
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }
        },

        logout() {
            return initialState;
        }

    }
});

export const authActions = authSlice.actions;
export default authSlice;