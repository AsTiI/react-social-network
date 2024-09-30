import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersState, User } from '../types/index'

const initialState: UsersState = {
    users: [{
        id: 2,
        isAuthenticated: false,
        email: "222@222",
        password: "222",
        name: "222",
    },{
        id: 1,
        isAuthenticated: false,
        email: "111@111",
        password: "111",
        name: "111",
    }],
    currentUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UsersState, action: PayloadAction<User>) => {
             state.users.push({...action.payload, id: Date.now()});
        },
        setLocalStorage: (state: UsersState, action: PayloadAction<User>) => {

            localStorage.setItem("rsn", JSON.stringify(state.currentUser))
        },
        login(state: UsersState, action: PayloadAction<{email: string, password: string} | null>) {
            if(action.payload){
                const { email, password } = action.payload
                const authenticatedUser = state.users.find((user)=> { return user.email === email && user.password === password })
                
                if(authenticatedUser) {
                    state.currentUser = {
                        ...authenticatedUser,
                        isAuthenticated: true,
                    }
                    localStorage.setItem("rsn", JSON.stringify(state.currentUser))
                }
            } 
           
        },
        logout(state: UsersState) {
            state.currentUser = null;
            localStorage.removeItem("rsn")
        }
    },
});

export const { setUser, login, logout } = userSlice.actions;
export default userSlice.reducer;