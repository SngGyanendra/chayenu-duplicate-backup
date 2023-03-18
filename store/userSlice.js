import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptions: [],
  countries: [],
  cancel_reasons: [],
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateSubscriptions: (state, { payload }) => {
      state.subscriptions = payload;
    },
    updateCountries: (state, { payload }) => {
      state.countries = payload;
    },
    updateCancelReasons: (state, { payload }) => {
      state.cancel_reasons = payload;
    },
    saveUserData: (state, { payload }) => {
      state.subscriptions = payload.subscriptions;
      state.countries = payload.countries;
      state.cancel_reasons = payload.cancel_reasons;
    },
    removeUserData: (state, { payload }) => {
      state.subscriptions = [];
      state.cancel_reasons = [];
      state.countries = [];
    },
  },
});

export const {
  updateSubscriptions,
  updateCountries,
  updateCancelReasons,
  saveUserData,
  removeUserData,
} = userSlice.actions;

export default userSlice.reducer;