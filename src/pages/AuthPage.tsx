import '../styles/AuthPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { login } from '../redux/slices/userSlice';

const AuthPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);
            navigate("/profile");
        }else{
            const token = localStorage.getItem('rsn');
            if (token) {
                try {
                    const parsedToken = JSON.parse(token);
                    dispatch(login({ email: parsedToken.email, password: parsedToken.password }));
                } catch (error) {
                    console.error("Ошибка при парсинге токена:", error);
                }
            }
        }
    }, [currentUser]);

    const handleReg = () => {
        navigate("/registration");
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login({ email: email, password: password }));
    };

    return (
        <div className='authpage_container'>
            <h2>Авторизация</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Почта:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                <input type="button" value="Регистрация" onClick={handleReg} />
            </form>
        </div>
    );
};

export default AuthPage;