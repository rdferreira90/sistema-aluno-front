import api from './axios';
import { LoginCredentials, LoginResponse } from '../types/user';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/public/auth/login', credentials);
  return response.data;
}
