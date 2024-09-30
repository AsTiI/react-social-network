export interface User {
    id: number;
    isAuthenticated?: boolean;
    email: string;
    password: string;
    name: string;
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
    error: string | null;
}
