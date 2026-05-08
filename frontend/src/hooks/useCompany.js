import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCompanyProfile,
  updateCompanyProfile,
  registerCompany,
  clearCompanyError,
  clearRegisterSuccess,
} from '../store/slices/companySlice';
import { companyApi } from '../api/companyApi';

export const useCompany = () => {
  const dispatch = useDispatch();
  const { profile, loading, updating, registering, error, updateError, registerError, registerSuccess } =
    useSelector((state) => state.company);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data: companyData, isLoading: queryLoading, refetch } = useQuery({
    queryKey: ['companyProfile'],
    queryFn: companyApi.getProfile,
    enabled: isAuthenticated,
    retry: 1,
    onSuccess: (data) => {
      dispatch({ type: 'company/setProfile', payload: data });
    },
    onError: () => {},
  });

  const updateProfile = async (data) => {
    const result = await dispatch(updateCompanyProfile(data));
    if (updateCompanyProfile.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, error: result.payload };
  };

  const register = async (data) => {
    const result = await dispatch(registerCompany(data));
    if (registerCompany.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, error: result.payload };
  };

  return {
    profile: profile || companyData,
    loading: loading || queryLoading,
    updating,
    registering,
    error,
    updateError,
    registerError,
    registerSuccess,
    updateProfile,
    register,
    refetch,
    clearError: () => dispatch(clearCompanyError()),
    clearRegisterSuccess: () => dispatch(clearRegisterSuccess()),
  };
};
