import {jwtDecode} from 'jwt-decode';
import api from './axios';
import { LoginCredentials, LoginResponse } from '../types/user';
import { UnitPermission } from '@/contexts/AuthContext';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/public/auth/login', credentials);
  return response.data;
}



export interface DecodedToken {
  username: string;
  is_global_admin: false;
  permissionsByUnit: UnitPermission[];  
  // permissions: {
  //   id: number;    
  //   name: string;
  //   description: string;
  // }[];
  // outros campos: sub, exp, etc.
}

export function getPermissionsFromToken(token?: string): DecodedToken | null {
  if (!token) {
    token = localStorage.getItem('token') || '';
  }  
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}