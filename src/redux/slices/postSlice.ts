import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostState } from '../types/index'

const initialState = {
    posts: [{ 
        userId: 1,
        id: 1,
        title: 'Первый пост первого пользователя',
        body: 'Описание первого поста первого пользователя',
    },
    { 
        userId: 1,
        id: 2,
        title: 'Второй пост первого пользователя',
        body: 'Описание второго поста первого пользователя',
    },
    { 
        userId: 2,
        id: 3,
        title: 'Первый пост второго пользователя',
        body: 'Описание первого поста второго пользователя',
    },
    { 
        userId: 2,
        id: 4,
        title: 'Второй пост второго пользователя',
        body: 'Описание первого поста второго пользователя',
    },
    { 
        userId: 2,
        id: 5,
        title: 'Третий пост второго пользователя',
        body: 'Описание первого поста второго пользователя',
    }],
    userPosts: [],
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
        addPost: (state: PostState, action: PayloadAction<Post>) => {
            state.posts.push({...action.payload, id: state.posts.reduce((acc, currentValue)=> Math.max(acc, currentValue.id),0)+1});
        },
        removePost: (state: PostState, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
            if(state.userPosts)
                state.userPosts = state.userPosts.filter(post=> post.id !== action.payload);
        },
        setUserPosts: (state: PostState, action: PayloadAction<number>) => {
            state.userPosts = state.posts.filter(post=> post.userId === action.payload);
            console.log(action.payload);
            
        },
        clearUserPosts: (state: PostState)=> {
            state.userPosts = null;
        }
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

export const { addPost, removePost, setUserPosts, clearUserPosts } = postSlice.actions;
export default postSlice.reducer;