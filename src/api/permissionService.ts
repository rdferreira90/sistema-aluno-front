import api from './axios';

const basePrivate = 'private'
const baseFile = 'permission'

export const getAllPermissions = async () => {
  const response = await api.get(`${basePrivate}/${baseFile}`);
  return response.data;
};

export const getPermissionById = async (id: number) => {
  const response = await api.get(`${basePrivate}/${baseFile}/${id}`);
  return response.data;
};

export const createPermission = async (data: { name: string; description: string }) => {
  const response = await api.post(`${basePrivate}/${baseFile}`, data);
  return response.data;
};

export const updatePermission = async (id: number, data: { name: string; description: string }) => {
  const response = await api.put(`${basePrivate}/${baseFile}/${id}`, data);
  return response.data;
};
