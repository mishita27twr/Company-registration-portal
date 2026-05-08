import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, logout, clearError } from '../store/slices/authSlice';
import { clearUserProfile } from '../store/slices/userSlice';
import { ROUTES } from '../utils/constants';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(result)) {
      navigate(ROUTES.DASHBOARD);
      return { success: true };
    }
    return { success: false, error: result.payload };
  };

  const register = async (userData) => {
    const result = await dispatch(registerUser(userData));
    if (registerUser.fulfilled.match(result)) {
      navigate(ROUTES.DASHBOARD);
      return { success: true };
    }
    return { success: false, error: result.payload };
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserProfile());
    navigate(ROUTES.LOGIN);
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    token,
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: handleLogout,
    clearError: clearAuthError,
  };
};
