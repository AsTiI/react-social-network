import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/index'

const initialState: User = {
        id: 0,
        isAuthenticated: false,
        email: "",
        password: "",
        surname: "",
        name: "",
        fathername: "",
    }

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state = action.payload 
            state.isAuthenticated = true;
            localStorage.setItem("rsn", JSON.stringify(state))
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.setItem("rsn", JSON.stringify(state))
        }
    }    
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;