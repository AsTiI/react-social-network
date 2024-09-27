import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostState } from '../types/index'

const initialState = {
    posts: [{ 
        userId: 0,
        id: 0,
        title: '',
        body: '',
    }],
    loading: false,
    error: '',
};

// Асинхронный thunk для загрузки постов
export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
});

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Неизвестная ошибка';
                // state.error = typeof action.error.message === 'string'? action.error.message : 'Неизвестная ошибка';
            });
    },
});

export const { addPost, removePost } = postSlice.actions;
export default postSlice.reducer;