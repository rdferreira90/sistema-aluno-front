import { IFile } from '@/types/file';
import axios from './axios';

const basePrivate = 'private'
const baseFile = 'file'

export async function getByCourseSubject(courseSubjectId: number): Promise<IFile[]> {
    const response = await axios.get<IFile[]>(`${basePrivate}/${baseFile}/${courseSubjectId}`);
    return response.data;
}


export async function downloadFile(fileId: number, fileName: string): Promise<any> {
    const response = await axios.get(`${basePrivate}/${baseFile}/download/${fileId}`, {
        responseType: 'blob',
    });

    return response.data;
}

export async function uploadFile(file: File, courseSubjectId: number) {
    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('courseSubjectId', String(courseSubjectId));

    const response = await axios.post(`${basePrivate}/${baseFile}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}