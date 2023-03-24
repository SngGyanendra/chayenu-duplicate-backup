import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptions: [{label:'jjj'}],
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
      state.subscriptions = payload;
    },
    updateCountries: (state, { payload }) => {
      state.countries = payload;
    },
    updateCancelReasons: (state, { payload }) => {
      state.cancel_reasons = payload;
    },
    updateTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
    updateUserDetails: (state, { payload }) => {
      state.user_details = payload;
    },
    updateSupportIssues: (state, { payload }) => {
      state.support_issues = payload;
    },
    updatePaymentMethods: (state, { payload }) => {
      state.payment_methods = payload;
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
