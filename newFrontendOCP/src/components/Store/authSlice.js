import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAdmin: false,
  },
  reducers: {
    setAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setAdminStatus } = authSlice.actions;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export default authSlice.reducer;
