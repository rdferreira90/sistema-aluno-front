import { Subject } from '../types/subject';
import axios from './axios'; 

export async function getAllSubjects(): Promise<Subject[]> {
  // const response = await axios.get<Subject[]>('/subjects');
  // return response.data;

  const mockSubjects: Subject[] = [
    { id: 1, name: 'Teologia Sistemática', professor: 'Pr. João Silva', professorId: 1 },
    { id: 2, name: 'Homilética', professor: 'Pr. Carlos Mendes' , professorId: 2},
    { id: 3, name: 'História da Igreja', professor: 'Pr. Paulo Rocha', professorId: 3 },
  ];
return Promise.resolve(mockSubjects)

}


export async function getSubjectById(id: number): Promise<Subject> {
  // const response = await axios.get<Subject>(`/subjects/${id}`);
  // return response.data;

  const data: Subject = {
    id: Number(id),
    name: 'Teologia Sistemática',
    description: 'Estudo das doutrinas fundamentais da fé cristã.',
    professor: 'Pr. João Silva',
    professorId: 1
  };
  return Promise.resolve(data)
}