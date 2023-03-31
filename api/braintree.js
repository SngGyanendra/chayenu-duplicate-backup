import axios from 'axios';
import { backendUrl } from './config';

export async function generateBraintreeToken(values) {
  try {
    const { data } = await axios.get(`${backendUrl}/user/generateToken`);
    return data;
  } catch (error) {
    throw error;
  }
}
