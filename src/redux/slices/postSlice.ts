import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostState {
    user: null | { id: string; name: string };
}

const initialState: PostState = {
    user: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.user = action.payload;
        },
        clearPost: (state) => {
            state.user = null;
        },
    },
});

export const { setPost, clearPost } = postSlice.actions;
export default postSlice.reducer;