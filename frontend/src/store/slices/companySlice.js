import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { companyApi } from '../../api/companyApi';
import { parseApiError } from '../../utils/helpers';

export const fetchCompanyProfile = createAsyncThunk(
  'company/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await companyApi.getProfile();
      return data;
    } catch (error) {
      return rejectWithValue(parseApiError(error));
    }
  }
);

export const updateCompanyProfile = createAsyncThunk(
  'company/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await companyApi.updateProfile(profileData);
      return data;
    } catch (error) {
      return rejectWithValue(parseApiError(error));
    }
  }
);

export const registerCompany = createAsyncThunk(
  'company/register',
  async (companyData, { rejectWithValue }) => {
    try {
      const data = await companyApi.registerCompany(companyData);
      return data;
    } catch (error) {
      return rejectWithValue(parseApiError(error));
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    profile: null,
    loading: false,
    updating: false,
    registering: false,
    error: null,
    updateError: null,
    registerError: null,
    registerSuccess: false,
  },
  reducers: {
    clearCompanyError: (state) => {
      state.error = null;
      state.updateError = null;
      state.registerError = null;
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCompanyProfile.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateCompanyProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
      })
      .addCase(updateCompanyProfile.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
      })
      .addCase(registerCompany.pending, (state) => {
        state.registering = true;
        state.registerError = null;
        state.registerSuccess = false;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.registering = false;
        state.profile = action.payload;
        state.registerSuccess = true;
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.registering = false;
        state.registerError = action.payload;
      });
  },
});

export const { clearCompanyError, clearRegisterSuccess, setProfile } = companySlice.actions;
export default companySlice.reducer;
