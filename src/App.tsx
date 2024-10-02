import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostsPage from './pages/PostsPage';
import AuthPage from './pages/AuthPage';
import RegistrationPage from './pages/RegistrationPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { login } from './redux/slices/userSlice';

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(true);
    const isAuthenticated = useSelector((state: RootState) => state.user.currentUser?.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
      setIsAuth(!!isAuthenticated); 
    }, [isAuthenticated]);

    useEffect(() => {
      const token = localStorage.getItem('rsn');

      if (token) {
        try {
          const parsedToken = JSON.parse(token);
          if (parsedToken.email && parsedToken.password) {
            dispatch(login({ email: parsedToken.email, password: parsedToken.password }));
          } else {
            console.error("Токен не имеет полей email или password");
          }
        } catch (error) {
          console.error("Ошибка при парсинге токена:", error);
        }
      }
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/auth" />} />
                    <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />} />
                    <Route path="/posts" element={isAuth ? <PostsPage /> : <Navigate to="/auth" />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/registration" element={!isAuth ?<RegistrationPage /> : <Navigate to="/auth" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;