import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';


const ProfilePage:React.FC = () => {
    const user = useSelector((state:RootState) => state.user.user);
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/auth")
    }

    if(!user) {
        return (
            <div>
                <h1>Пожалуйста, войдите в систему, чтобы видеть ваш профиль.</h1>;
                <input type="button" value="Авторизация" onClick={handleLogout}/>
            </div>
        )
    }

    return (
        <div>
            <h1>Профиль пользователя</h1>
            <h2>Имя: {user.name}</h2>
            <p>ID: {user.id}</p>
            <input type="button" value="Выйти" onClick={handleLogout} />
        </div>
    )
}

export default ProfilePage