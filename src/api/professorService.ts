import api from './axios';

const basePrivate = 'private'
const baseFile = 'professor'

export async function getAllProfessors() {
  const res = await api.get(`${basePrivate}/${baseFile}`);
  return res.data;
}
