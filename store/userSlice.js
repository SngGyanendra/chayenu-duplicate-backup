import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptions: [],
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
