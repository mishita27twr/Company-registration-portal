import axiosInstance from './axiosInstance';

export const authApi = {
  register: async (data) => {
    const response = await axiosInstance.post('/api/auth/signup', data);
    return response.data;
  },

  login: async (data) => {
    const response = await axiosInstance.post('/api/auth/login', data);
    return response.data;
  },
};