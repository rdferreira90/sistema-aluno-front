import api from './axios';
import { CreateUserPayload } from '../types/user';

const basePrivate = 'private'
const baseUser = 'users'

export async function createUser(payload: CreateUserPayload) {
  const response = await api.post(`${basePrivate}/${baseUser}`, payload);
  return response.data;
}
export async function getAllUsers() {
  const response = await api.get(`${basePrivate}/${baseUser}`);
  return response.data;
}
export async function deleteUser(id: number) {
  const response = await api.delete(`${basePrivate}/${baseUser}/${id}`);
  return response.data;
}

export const updateUser = async (id: number, data: CreateUserPayload) => {
  const response = await api.put(`${basePrivate}/${baseUser}/${id}`, data);
  return response.data;
};
