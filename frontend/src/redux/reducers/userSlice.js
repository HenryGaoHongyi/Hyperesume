// src/redux/reducers/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userInfo: null, // { id, username, role, ... }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
