import { useState } from 'react'

import { User } from '../redux/types/index'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import '../styles/RegistrationPage.css'
import Button from '../components/Button/Button';

export default function RegistrationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialUser: User = {
        id: 0,
        isAuthenticated: false,
        email: "",
        password: "",
        surname: "",
        name: "",
        fathername: "",
    }

    const [newUser, setNewUser] = useState<User>(initialUser)
    const [error, setError] = useState<string | null>(null);


    const onReg = () =>{
        console.log(newUser);
        dispatch(setUser(newUser));
        navigate("/auth");
    }

  return (
    <div className='regpage_container'>
            <h2>Форма регистрации</h2>
            <form onSubmit={onReg}>
            <div className='form_elem'>
                    <label htmlFor="surname">Фамилия:</label>
                        <input
                            type="text"
                            name="surname"
                            id="user_surname"
                            value={newUser.surname}
                            onChange={(e) => setNewUser({...newUser, surname: e.target.value})}
                            required
                        />
                </div>
                <div className='form_elem'>
                    <label htmlFor="name">Имя:</label>
                        <input
                            type="text"
                            name="name"
                            id="user_password"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            required
                        />
                </div>
                <div className='form_elem'>
                    <label htmlFor="fathername">Отчество:</label>
                        <input
                            type="text"
                            name="fathername"
                            id="user_fathername"
                            value={newUser.fathername}
                            onChange={(e) => setNewUser({...newUser, fathername: e.target.value})}
                            required
                        />
                </div>
                <div className='form_elem'>
                    <label htmlFor="email">Почта:</label>
                        <input
                            type="email"
                            name="email"
                            id="user_email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            required
                        />
                </div>
                <div className='form_elem'>
                    <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            name="password"
                            id="user_password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            required
                        />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" value='Зарегистрироваться' />
                <Button value='Назад' onClick={()=>navigate("/auth")}/>
            </form>
        </div>
  )
}
