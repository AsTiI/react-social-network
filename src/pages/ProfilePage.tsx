import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';



const ProfilePage: React.FC = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/auth");
    };

    useEffect(() => {
        const parsed = localStorage.getItem("rsn");
        if (parsed) {
            const parsedUser = JSON.parse(parsed);

            // Если currentUser отсутствует, но есть данные в localStorage, можно его установить в Redux
            if (!currentUser || parsedUser.email !== currentUser.email) {
                // Если в локальном хранилище есть пользователь, можно перенаправить на страницу авторизации
                navigate("/auth");
            }
        } else {
            navigate("/auth");
        }
    }, [currentUser]);

    if (!currentUser) {
        return (
            <div>
                <h1>Пожалуйста, войдите в систему, чтобы видеть ваш профиль.</h1>
                <input type="button" value="Авторизация" onClick={handleLogout} />
            </div>
        );
    }

    return (
        <div>
            <h1>Профиль пользователя</h1>
            <h2>Имя: {currentUser.name}</h2>
            <p>ID: {currentUser.id}</p>
            <input type="button" value="Выйти" onClick={handleLogout} />
            <input type="button" value="HomaPage" onClick={()=>navigate("/")} />
        </div>
    );
};

export default ProfilePage;