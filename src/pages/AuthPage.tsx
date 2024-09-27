import '../styles/AuthPage.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser, clearUser } from '../redux/slices/userSlice'
// import User from '../redux/types/index';

const AuthPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.user.user);
    
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
                
            if (username === 'user' && password === 'password') {
                dispatch(setUser({id: '1', name: 'maxim', login: username, password: password}));
                navigate("/profile")
            } else {
                setError('Неверное имя пользователя или пароль');
            }
        } catch (err) {
            setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
        }
    }
    return (
        <div className='authpage_container'>
            <h2>Авторизация</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Имя пользователя:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default AuthPage;