import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AuthPage from '../pages/AuthPage'
import { addPost, setUserPosts } from '../redux/slices/postSlice'
import { login } from '../redux/slices/userSlice';
import { Post } from '../redux/types/index'
import Button from '../components/Button/Button';
import PostList from '../components/Post/PostList';

import '../styles/HomePage.css'

const HomePage: React.FC = () => {
    const [currentPosts, setCurrentPosts] = useState<Post[]>([])
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const { userPosts, posts }  = useSelector((state: RootState) => state.posts) 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        setCurrentPosts(posts);
    },[posts])

    const handleProfile = () => {
        navigate('/profile');
    }

    return (
        <div className='homepage'>
            {currentUser ? (
                <div className='homepage_container'>
                    <h2>Добро пожаловать, {currentUser.name}!</h2>
                    <Button value='Профиль' onClick={handleProfile} />
                    {currentPosts.length > 0? <PostList posts={posts}/>: <p style={{ color: 'red' }}>Посты отсутствуют</p>}
                </div>
            ) : (<AuthPage/> )}
        </div>
    );
};

export default HomePage;