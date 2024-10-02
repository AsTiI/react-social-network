export interface User {
    id: number;
    isAuthenticated?: boolean;
    email: string;
    password: string;
    surname: string;
    name: string;
    fathername: string;
}

export interface UsersState {
    users: User[];
    currentUser: User | null;
}

export interface Post {
    userId: number,
    id: number;
    title: string;
    body: string;
}

export interface PostState {
    posts: Post[];
    loading: boolean;
    userPosts: Post[] | null;
    error: string | null;
}
