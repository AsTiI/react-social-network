import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import authReducer from './slices/authSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
        auth: authReducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;