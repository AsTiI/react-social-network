import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';
import { clearUserPosts } from '../redux/slices/postSlice';
import Button from '../components/Button/Button';
import { Post } from '../redux/types/index'
import { addPost, removePost, setUserPosts } from '../redux/slices/postSlice'
import { login } from '../redux/slices/userSlice';



import '../styles/ProfilePage.css'
import InputBtn from '../components/Button/InputBtn';
import PostList from '../components/Post/PostList';



const ProfilePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [newPostTittle, setNewPostTittle] = useState("")
    const [newPostBody, setNewPostBody] = useState("")
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const userPosts  = useSelector((state: RootState) => state.posts.userPosts) 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearUserPosts())
        navigate("/auth");
    };

    useEffect(()=>{
        if(currentUser){
            console.log(currentUser);
            dispatch(setUserPosts(currentUser.id));
            setPosts(userPosts);
        }else{
            const token = localStorage.getItem('rsn');
            if (token) {
                try {
                    const parsedToken = JSON.parse(token);
                    dispatch(login({ email: parsedToken.email, password: parsedToken.password }));
                    dispatch(setUserPosts(parsedToken.id));
                    setPosts(userPosts);
                } catch (error) {
                    console.error("Ошибка при парсинге токена:", error);
                }
            }
        }
    },[])

    useEffect(()=>{
        if(currentUser){
            setPosts(userPosts);
            console.log(userPosts);
        }
    },[userPosts])

    if (!currentUser) {
        return (
            <div>
                <h1>Загрузка...</h1>
                {/* <h1>Пожалуйста, войдите в систему, чтобы видеть ваш профиль.</h1> */}
                {/* <Button value="Авторизация" onClick={handleLogout} /> */}
            </div>
        );
    }

    const addNewPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(currentUser){
            dispatch(addPost({ 
                userId: currentUser.id,
                id: Date.now(),
                title: newPostTittle,
                body: newPostBody,
            }))
            dispatch(setUserPosts(currentUser.id))
            setNewPostTittle("");
            setNewPostBody("");
        }
    }

    const deleteMyPost = (idPost:number) => {
        dispatch(removePost(idPost));
    }

    return (
        <div className='profilePage_container'>
            <div className="header">
                <div className="about">
                    <img src="data:image/jpeg;base64,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" />
                    <h2>{currentUser.surname +' '+currentUser.name}</h2>
                    <Button value="Выйти" onClick={handleLogout} />
                    <Button value="Посты" onClick={()=>navigate("/")} />
                </div>
                <div className="images_wrapper">
                    <div className="images">
                        <div className="img"></div>
                        <div className="img"></div>
                        <div className="img"></div>
                        <div className="img"></div>
                    </div>
                    <div className="images_details">
                        <Button value='Подробнее' />
                    </div>
                </div>
                
            </div>
            <div className="posts_section">
                <form onSubmit={addNewPost}>
                    <div className='form_elem'>
                        <label>Название поста:</label>
                            <InputBtn value={newPostTittle}
                                onChange={(e) => setNewPostTittle(e.target.value)} />
                    </div>
                    <div className='form_elem'>
                        <label>Описание:</label>
                            <InputBtn value={newPostBody}
                                    onChange={(e) => setNewPostBody(e.target.value)} />
                    </div>
                    <Button type="submit" value="Создать" />
                </form>
                {userPosts && userPosts.length > 0? <PostList posts={posts} onClick={deleteMyPost} />: <p style={{ color: 'red' }}>Посты отсутствуют</p>}
            </div>
            
            
        </div>
    );
};

export default ProfilePage;