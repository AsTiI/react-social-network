export interface User {
    id: string;
    login: string;
    password: string;
    name: string;
}

export interface UserState {
    user: null | { id: string; name: string, login: string, password: string };
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
