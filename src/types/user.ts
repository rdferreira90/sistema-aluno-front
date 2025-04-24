export type UserType = 'generic' | 'professor' | 'student' | 'admin' | 'globalAdmin';
export type UserStatus = 'active' | 'inactive';


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
    specialization?:string;
    isStudent: boolean;
    isAdmin: boolean;
    isGlobalAdmin: boolean;
    status: UserStatus;
}

export interface LoginResponse {
    token: string;
    user: User;
}


export interface Profile {
  id: number;
  name: string;
}

export interface CreateUserPayload {
    id?: number;
    name: string;
    email: string;
    username: string;
    enrollment: string;
    password: string;
    status: boolean;
    isGlobalAdmin: boolean;
    userType: UserType;
    profileId: number;
    specialization?: string;
  } 
