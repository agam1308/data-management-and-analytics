import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  // Initial state starts as logged out
  initialState: {
    user: null, 
    isAuthenticated: false, 
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
