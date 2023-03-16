import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  first_name: '',
  last_name: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      localStorage.setItem('token', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      localStorage.setItem('email', payload.email);
      localStorage.setItem('id', payload.id);
      localStorage.setItem('first_name', payload.first_name);
      localStorage.setItem('last_name', payload?.last_name);
      state.isLoggedIn = true;
      state.first_name = payload.first_name;
      state.last_name = payload?.last_name;
      state.email = payload.email;
    },
    logoutUser: (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.first_name = '';
      state.last_name = '';
      state.email = '';
    },
    setNewTokens: (state, { payload }) => {
      localStorage.setItem('token', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
    },
  },
});

export const { loginUser, logoutUser, setNewTokens } = authSlice.actions;

export default authSlice.reducer;
