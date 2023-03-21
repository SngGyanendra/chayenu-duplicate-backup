import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptions: [],
  countries: [],
  cancel_reasons: [],
  transactions_list: [],
  user_details: {},
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
    updateTransactions: (state, { payload }) => {
      state.transactions_list = payload;
    },
    updateUserDetails: (state, { payload }) => {
      state.user_details = payload;
    },
    saveUserData: (state, { payload }) => {
      state.subscriptions = payload.subscriptions;
      state.countries = payload.countries;
      state.cancel_reasons = payload.cancel_reasons;
      state.transactions_list = payload.transactions_list;
      state.user_details = payload.user_details;
    },
    removeUserData: (state, { payload }) => {
      state.subscriptions = [];
      state.cancel_reasons = [];
      state.countries = [];
      state.transactions_list = [];
      state.user_details = {};
    },
  },
});

export const {
  updateSubscriptions,
  updateCountries,
  updateCancelReasons,
  updateTransactions,
  saveUserData,
  removeUserData,
  updateUserDetails,
} = userSlice.actions;

export default userSlice.reducer;
