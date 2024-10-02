import React from 'react';
import './Post.css';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    
}

interface PostComponentProps {
    post: Post;
    onClick?: (id:number)=> void;
}

const Post: React.FC<PostComponentProps> = ({post, onClick}) => {

    return (
        <div className='post_container'>
            
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {onClick && <div className="delete" onClick={(e)=> onClick && onClick(post.id)} >
                X
            </div>}
        </div>
    )
}

export default Post;