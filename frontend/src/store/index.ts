import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '@store/auth/authSlice';
import LoadingSlice from './loading/loadingSlice';
import GamesSlice from './games/gamesSlice';

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        loading: LoadingSlice.reducer,
        gamesTypes: GamesSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;