import api from './axios';

const basePrivate = 'private'
const baseCourse = 'class-assignments'

export async function getAllClassAssignments() {
  const response = await api.get(`${basePrivate}/${baseCourse}`);
  return response.data;
}

export async function deleteClassAssignment(id: number) {
  const response = await api.delete(`${basePrivate}/${baseCourse}/${id}`);
  return response.data;
}

export async function getClassAssignmentById(id: number) {
  const res = await api.get(`${basePrivate}/${baseCourse}/${id}`);
  return res.data;
}

export async function createClassAssignment(data: ClassAssignmentFormData) {
  const res = await api.post(`${basePrivate}/${baseCourse}`, data);
  return res.data;
}

export async function updateClassAssignment(id: number, data: ClassAssignmentFormData) {
  const res = await api.put(`${basePrivate}/${baseCourse}/${id}`, data);
  return res.data;
}

