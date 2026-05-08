import axiosInstance from './axiosInstance';

export const companyApi = {
  registerCompany: async (data) => {
    const response = await axiosInstance.post('/api/company/register', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/api/company/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put('/api/company/profile', data);
    return response.data;
  },
};
