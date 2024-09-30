import { useState } from 'react'

import { User } from '../redux/types/index'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';


export default function RegistrationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialUser: User = {
        id: 0,
        isAuthenticated: false,
        email: "",
        password: "",
        name: "",
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
                <div>
                    <label>
                        Имя пользователя:
                        <input
                            type="text"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Почта:
                        <input
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            required
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
  )
}
