import api from './api';

export const enrollInCourse = (courseId) => api.post('/enroll', { courseId });
export const getMyCourses = () => api.get('/my-courses');
