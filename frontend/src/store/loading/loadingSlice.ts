import { createSlice } from '@reduxjs/toolkit';

const LoadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
        loadingEnabled() {
            return {
                isLoading: true
            }
        },

        loadingDisabled() {
            return {
                isLoading: false
            }
        }
    }
});

export const loadingActions = LoadingSlice.actions;
export default LoadingSlice;