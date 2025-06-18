import api from './axios';

const basePrivate = 'private'
const baseFile = 'course-subject'

export async function getAllCourseSubjects() {
  const res = await api.get(`${basePrivate}/${baseFile}`);
  return res.data;
}
