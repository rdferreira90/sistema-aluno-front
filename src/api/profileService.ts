import api  from './axios';

const basePrivate = 'private'
const baseFile = 'profile'

export const getAllProfiles = async () => {
  const response = await api.get(`${basePrivate}/${baseFile}`);
  return response.data;
};

export const getProfileById = async (id: number) => {
  const response = await api.get(`${basePrivate}/${baseFile}/${id}`);
  return response.data;
};

export const createProfile = async (data: { name: string; description: string; permissionIds: number[] }) => {
  const response = await api.post(`${basePrivate}/${baseFile}`, data);
  return response.data;
};

export const updateProfile = async (id: number, data: { name: string; description: string; permissionIds: number[] }) => {
  const response = await api.put(`${basePrivate}/${baseFile}/${id}`, data);
  return response.data;
};
