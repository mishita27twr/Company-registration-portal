import { createSlice } from '@reduxjs/toolkit';
import { tokenService } from '../../services/tokenService';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: tokenService.getUser(),
    preferences: {
      notifications: true,
      emailAlerts: true,
    },
  },
  reducers: {
    updateUserProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      tokenService.setUser(state.profile);
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { updateUserProfile, updatePreferences, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
