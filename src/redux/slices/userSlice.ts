import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersState, User } from '../types/index'

const initialState: UsersState = {
    users: [{
        id: 1,
        isAuthenticated: false,
        email: "maxim@gmail.com",
        password: "111",
        surname: "Астапёнок",
        name: "Максим",
        fathername: "Дмитриевич",
    },{
        id: 2,
        isAuthenticated: false,
        email: "alice@gmail.com",
        password: "222",
        surname: "Мурукина",
        name: "Алиса",
        fathername: "Петровна",
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