import axios from 'axios';
import { LoginCredentials, LoginResponse } from '../types/user';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('http://localhost:3000/public/auth/login', credentials);
  return response.data;
}
