import axiosInstance from './axiosInstance';

export const uploadApi = {
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await axiosInstance.post('/api/company/upload-logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  uploadBanner: async (file) => {
    const formData = new FormData();
    formData.append('banner', file);
    const response = await axiosInstance.post('/api/company/upload-banner', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
