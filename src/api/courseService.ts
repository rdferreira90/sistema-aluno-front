import api from './axios';

interface Course {
    id: number;
    name: string;
}


const basePrivate = 'private'
const baseCourse = 'course'

export async function getAllCourses(): Promise<Course[]> {
    const response = await api.get(`${basePrivate}/${baseCourse}`);	
    return response.data;
}

export async function deleteCourse(id: number): Promise<{ message: string }> {
    const response = await api.delete(`${basePrivate}/${baseCourse}/${id}`);
    return response.data;
}


export async function getCourseById(id: number) {
    const response = await api.get(`${basePrivate}/${baseCourse}/${id}`);
    return response.data;
}

export async function createCourse(payload: { name: string }) {
    const response = await api.post(`${basePrivate}/${baseCourse}`, payload);
    return response.data;
}

export async function updateCourse(id: number, payload: { name: string }) {
    const response = await api.put(`${basePrivate}/${baseCourse}/${id}`, payload);
    return response.data;
}
