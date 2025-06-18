import { Subject } from '../types/subject';
import api from './axios'; 

const basePrivate = 'private'
const baseSubject = 'subject'

export async function getAllSubjects(): Promise<Subject[]> {
  const response = await api.get<Subject[]>(`${basePrivate}/${baseSubject}`);
  return response.data;

//   const mockSubjects: SubjectsCardProps[] = [
//     { id: 1, name: 'Teologia Sistemática', professor: 'Pr. João Silva', professorId: 1 },
//     { id: 2, name: 'Homilética', professor: 'Pr. Carlos Mendes' , professorId: 2},
//     { id: 3, name: 'História da Igreja', professor: 'Pr. Paulo Rocha', professorId: 3 },
//   ];
// return Promise.resolve(mockSubjects)

}


export async function getSubjectById(id: number): Promise<Subject> {
  const response = await api.get<Subject>(`${basePrivate}/${baseSubject}/${id}`);
  return response.data;

  // const data: SubjectsCardProps = {
  //   id: Number(id),
  //   name: 'Teologia Sistemática',
  //   description: 'Estudo das doutrinas fundamentais da fé cristã.',
  //   professor: 'Pr. João Silva',
  //   professorId: 1
  // };
  // return Promise.resolve(data)
}

export const deleteSubject = async (id: number): Promise<any> => {
  const response = await api.delete(`${basePrivate}/${baseSubject}/${id}`);
  return response.data;
};

export const updateSubject = async (id: number, data: Partial<Subject>) => {
  const response = await api.put(`${basePrivate}/${baseSubject}/${id}`, data);
  return response.data;
};

export const createSubject  = async (data: Partial<Subject>) => {
  const response = await api.post(`${basePrivate}/${baseSubject}`, data);
  return response.data;
};