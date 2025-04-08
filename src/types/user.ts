export interface LoginCredentials {
    username: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    enrollment: string;
    profile: {
        id: number;
        name: string;
    } | null;
    isProfessor: boolean;
    isStudent: boolean;
}

export interface LoginResponse {
    token: string;
    user: User;
}
