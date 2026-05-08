import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import { tokenService } from '../../services/tokenService';
import { parseApiError } from '../../utils/helpers';

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authApi.login(credentials);
    return data;
  } catch (error) {
    return rejectWithValue(parseApiError(error));
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const data = await authApi.register(userData);
    return data;
  } catch (error) {
    return rejectWithValue(parseApiError(error));
  }
});

const initialState = {
  token: tokenService.getToken(),
  user: tokenService.getUser(),
  isAuthenticated: tokenService.isAuthenticated(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      tokenService.clearAll();
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      tokenService.setUser(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user } = action.payload;
        state.token = token;
        state.user = user || null;
        state.isAuthenticated = true;
        if (token) tokenService.setToken(token);
        if (user) tokenService.setUser(user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user } = action.payload;
        if (token) {
          state.token = token;
          state.isAuthenticated = true;
          tokenService.setToken(token);
        }
        if (user) {
          state.user = user;
          tokenService.setUser(user);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
