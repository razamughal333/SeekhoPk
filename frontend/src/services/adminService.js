import api from './api';

export const getUsers = () => api.get('/admin/users');
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const getAnalytics = () => api.get('/admin/analytics');
