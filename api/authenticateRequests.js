import axios from 'axios';
import { getAllSupportIssues } from '/api/common';
import { directusUrl, backendUrl } from './config';

export class AuthencticatedUserAPI {
  constructor() {
    if (typeof window !== 'undefined') {
      this.requestInstance = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage?.getItem('token')}`,
        },
      });
    }
  }

  async prefetchAllData() {
    try {
      const { data } = await this.requestInstance.get(
        `${backendUrl}/subscription/list`
      );

      const { data: transactions } = await this.requestInstance.get(
        `${backendUrl}/transactions`
      );

      const {
        data: { data: countries },
      } = await axios.get(`${directusUrl}/items/countries`, {
        params: {
          fields: '*.*',
          filter: {
            _or: [
              { has_distributors: { _eq: 'true' } },
              { has_shipping: { _eq: 'true' } },
            ],
          },
        },
      });
      const {
        data: { data: cancel_reasons },
      } = await axios.get(`${directusUrl}/items/cancel_reasons`);

      const { data: user_details } = await this.requestInstance.get(
        `${backendUrl}/auth/getUser`
      );

      const { data: support_issues } = await getAllSupportIssues();

      const payment_methods = await this.getAllPaymentMethods();
      return {
        subscriptions: data,
        countries: countries,
        cancel_reasons: cancel_reasons,
        transactions: transactions,
        user_details: user_details,
        support_issues: support_issues,
        payment_methods: payment_methods,
      };
    } catch (error) {}
  }

  async getAllUserSubscriptions() {
    try {
      const { data } = await this.requestInstance.get(
        `${backendUrl}/subscription/list`
      );
      return data;
    } catch (error) {}
  }

  async updatePaymentMethod(values) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/user/paymentmethods/billingaddress/update`,
        values
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateDefaultCard(card_token) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/user/paymentmethods/setdefaultcard`,
        { card_token }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllUserTransactions() {
    try {
      const { data } = await this.requestInstance.get(
        `${backendUrl}/transactions`
      );
      return data;
    } catch (error) {
      // throw error;
    }
  }

  async getAllPaymentMethods() {
    try {
      const { data } = await this.requestInstance.get(
        `${backendUrl}/user/paymentmethods/list`
      );
      return data;
    } catch (error) {
      // throw error;
    }
  }

  async transferSubscription(values) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/subscription/transferSubscription`,
        values
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async submitSupportRequest(values) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/support/createSupportRequest`,
        values
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      const { data } = await this.requestInstance.get(
        `${backendUrl}/auth/getUser`
      );
      return data;
    } catch (error) {
      if (error?.response?.status === 401) {
      } else {
      }
    }
  }

  async updatePassword(values) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/auth/changePassword`,
        values
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile(values) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/user/editProfile`,
        values
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(values) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/subscription/updateaddress`,
        values
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async reactivateSubscription(id) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/subscription/reactivate`,
        { id }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async cancelSubscription(id, reasons) {
    try {
      const response = await this.requestInstance.post(
        `${backendUrl}/subscription/cancelSubscription`,
        { id, reasons }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
