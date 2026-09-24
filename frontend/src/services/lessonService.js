import api from './api';

export const getLessons = (courseId) => api.get(`/courses/${courseId}/lessons`);
export const createLesson = (courseId, data) => api.post(`/courses/${courseId}/lessons`, data);
export const updateLesson = (id, data) => api.put(`/lessons/${id}`, data);
export const deleteLesson = (id) => api.delete(`/lessons/${id}`);
