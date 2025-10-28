import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessFlag: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessFlag: (state, action) => {
      state.accessFlag = action.payload;
    },
  },
});

export const { setAccessFlag } = authSlice.actions;
export default authSlice.reducer;
