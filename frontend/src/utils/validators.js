export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

export const isValidPhone = (phone) => {
  return phone && phone.replace(/\D/g, '').length >= 10;
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidRC = (rc) => {
  return rc && rc.trim().length >= 2;
};

export const validateLoginForm = (data) => {
  const errors = {};
  if (!data.email) errors.email = 'Email is required';
  else if (!isValidEmail(data.email)) errors.email = 'Enter a valid email';
  if (!data.password) errors.password = 'Password is required';
  else if (!isValidPassword(data.password)) errors.password = 'Password must be at least 8 characters';
  return errors;
};

export const validateRegisterForm = (data) => {
  const errors = {};
  if (!data.firstName) errors.firstName = 'First name is required';
  if (!data.lastName) errors.lastName = 'Last name is required';
  if (!data.email) errors.email = 'Email is required';
  else if (!isValidEmail(data.email)) errors.email = 'Enter a valid email';
  if (!data.password) errors.password = 'Password is required';
  else if (!isValidPassword(data.password)) errors.password = 'Password must be at least 8 characters';
  if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  return errors;
};
