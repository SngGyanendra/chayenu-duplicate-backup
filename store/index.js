import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './storiesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    auth: authReducer,
  },
});
