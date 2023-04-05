import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptions: [],
  countries: [],
  cancel_reasons: [],
  transactions: [],
  user_details: {},
  support_issues: [],
  payment_methods: [],
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateSubscriptions: (state, { payload }) => {
      if (payload?.length) state.subscriptions = payload;
    },
    updateCountries: (state, { payload }) => {
      if (payload?.length) state.countries = payload;
    },
    updateCancelReasons: (state, { payload }) => {
      if (payload?.length) state.cancel_reasons = payload;
    },
    updateTransactions: (state, { payload }) => {
      if (payload?.length) state.transactions = payload;
    },
    updateUserDetails: (state, { payload }) => {
      if (payload) state.user_details = payload;
    },
    updateSupportIssues: (state, { payload }) => {
      if (payload?.length) state.support_issues = payload;
    },
    updatePaymentMethods: (state, { payload }) => {
      if (payload?.length) state.payment_methods = payload;
    },
    saveUserData: (state, { payload }) => {
      state.subscriptions = payload.subscriptions;
      state.countries = payload.countries;
      state.cancel_reasons = payload.cancel_reasons;
      state.transactions = payload.transactions;
      state.user_details = payload.user_details;
      state.support_issues = payload.support_issues;
      state.payment_methods = payload.payment_methods;
    },
    removeUserData: (state, { payload }) => {
      state.subscriptions = [];
      state.cancel_reasons = [];
      state.countries = [];
      state.transactions = [];
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
  updateSupportIssues,
  updatePaymentMethods,
} = userSlice.actions;

export default userSlice.reducer;
