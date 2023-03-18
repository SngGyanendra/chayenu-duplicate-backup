import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './storiesSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    auth: authReducer,
    user: userReducer,
  },
});
