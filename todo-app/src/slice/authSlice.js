// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  accessFlag: localStorage.getItem('accessFlag')
    ? JSON.parse(localStorage.getItem('accessFlag'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setAccessFlag: (state, action) => {
      state.accessFlag = action.payload;
      localStorage.setItem('accessFlag', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.accessFlag = null;
      localStorage.removeItem('token');
      localStorage.removeItem('accessFlag');
    },
  },
});

export const { setToken, setAccessFlag, logout } = authSlice.actions;
export default authSlice.reducer;
