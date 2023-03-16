import axios from 'axios';
import { backendUrl } from './config';

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

  async getAllUserSubscriptions() {
    try {
      const {data} = await this.requestInstance.get(
        `${backendUrl}/subscription/list`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
