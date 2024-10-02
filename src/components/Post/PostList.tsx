import React from 'react';
import Post from './Post';
import './PostList.css';

interface UserPost {
    userId: number,
    id: number;
    title: string;
    body: string;
}

interface PostListComponentProps {
    posts: UserPost[]
    onClick?: (id:number)=> void;
}

const PostList:React.FC<PostListComponentProps> = ({posts, onClick}) => {
  return (
    <div className='postList_container'>
        {posts.map(post=> <Post key={post.id} post={post} onClick={onClick}/>)}
    </div>
  )
}

export default PostList