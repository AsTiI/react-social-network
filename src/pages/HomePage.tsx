import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AuthPage from '../pages/AuthPage'

const HomePage: React.FC = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const handleLogout = () => {
        // dispatch(logout());
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    return (
        <div>
            {currentUser ? (
                <div>
                    <h2>Добро пожаловать, {currentUser.name}!</h2>
                    <p>Это ваша лента новостей.</p>
                    <button onClick={handleLogout}>Выйти</button>
                    <button onClick={handleProfile}>Профиль</button>
                </div>
            ) : (<AuthPage/> )}
        </div>
    );
};

export default HomePage;