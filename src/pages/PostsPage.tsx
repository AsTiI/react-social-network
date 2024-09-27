import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/postSlice';
import { RootState } from '../redux/store';

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts() as any);
    }, [dispatch]);



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
};

export default PostList;