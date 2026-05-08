export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export const buildFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const parseApiError = (error) => {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (!error?.response) {
    if (error?.message?.includes('Network Error') || error?.message?.includes('timeout')) {
      return 'Unable to reach the server. Please check your connection and try again.';
    }
    return error?.message || 'An unexpected error occurred. Please try again.';
  }

  if (status === 404) return 'The requested endpoint was not found. Please contact support.';
  if (status === 401) return 'Invalid credentials. Please check your email and password.';
  if (status === 409) return 'An account with this email already exists. Please sign in instead.';
  if (status === 422 || status === 400) {
    const msg = data?.message || data?.error;
    if (typeof msg === 'string') return msg;
    if (Array.isArray(msg)) return msg[0];
  }

  const rawError = data?.error;
  if (typeof rawError === 'string' && (rawError.includes('relation') || rawError.includes('database') || rawError.includes('connection'))) {
    return 'The server is temporarily unavailable. Please try again in a few minutes.';
  }
  if (typeof rawError === 'object' && rawError?.code === '42P01') {
    return 'The server is temporarily unavailable. Please try again in a few minutes.';
  }

  if (data?.message && typeof data.message === 'string') return data.message;
  if (typeof rawError === 'string') return rawError;

  return 'Something went wrong. Please try again.';
};
