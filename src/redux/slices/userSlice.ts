import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: null | { id: string; name: string, login: string, password: string };
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<{ id: string; name: string, login: string, password: string }>) => {
            state.user = action.payload;
        },
        clearUser: (state: UserState) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;