import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser, clearUser } from '../redux/slices/userSlice'
import User from '../redux/types/index';

import AuthPage from '../pages/AuthPage'

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = useSelector((state: RootState) => state.user.user);
    const [newUser, setNewUser] = useState<User>({id:'', name:'', login: '', password: ''});

    const handleLogin = () => {
        // const mockUser = { id: '1', name: 'John Doe' };
        dispatch(setUser(newUser));
        navigate('/profile');
    };

    const handleLogout = () => {
        dispatch(clearUser());
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    return (
        <div>
            {user ? (
                <div>
                    <h2>Добро пожаловать, {user.name}!</h2>
                    <p>Это ваша лента новостей.</p>
                    <button onClick={handleLogout}>Выйти</button>
                    <button onClick={handleProfile}>Профиль</button>
                </div>
            ) : (<AuthPage/> )}
        </div>
    );
};

export default HomePage;