import axios from 'axios';
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

      const { data: transactions_list } = await this.requestInstance.get(
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

      return {
        subscriptions: data,
        countries: countries,
        cancel_reasons: cancel_reasons,
        transactions_list: transactions_list,
        user_details: user_details,
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

  async getAllUserTransactions() {
    try {
      const { data } = await this.requestInstance.get(
        `${backendUrl}/transactions`
      );
      return data;
    } catch (error) {}
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

  async getUser() {
    try {
      const response = await this.requestInstance.get(
        `${backendUrl}/auth/getUser`
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
    } catch (error) {}
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
