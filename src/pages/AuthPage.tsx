import '../styles/AuthPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { login } from '../redux/slices/userSlice';
import Button from '../components/Button/Button';

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
        console.log({ email: email, password: password });
    };

    return (
        <div className='authpage_container'>
            <h2>Авторизация</h2>
            <form onSubmit={handleLogin}>
                <div className='form_elem'>
                    <label htmlFor="email">Почта:</label>
                        <input
                            type="text"
                            name="email"
                            id="user_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                </div>
                <div className='form_elem'>
                    <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            id="user_password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="btns_container">
                    <Button type='submit' value='Войти' />
                    <Button value='Регистрация' onClick={handleReg}/>
                </div>
            </form>

        </div>
    );
};

export default AuthPage;