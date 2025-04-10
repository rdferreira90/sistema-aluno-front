import {jwtDecode} from 'jwt-decode';
import api from './axios';
import { LoginCredentials, LoginResponse } from '../types/user';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/public/auth/login', credentials);
  return response.data;
}



export interface DecodedToken {
  permissions: [{
    id:number;
    name:string;
    description:string;
  }];
  // outros campos: sub, exp, etc.
}

export function getPermissionsFromToken(token?: string): string[] {
  if (!token) {
    token = localStorage.getItem('token') || '';
  }  
  if (!token) return [];

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.permissions.map(p => p.name);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return [];
  }
}