import axios from 'axios';
import { backendUrl } from './config';

export async function registerUser(data) {
  try {
    const response = await axios.post(`${backendUrl}/user/register`, data);
    return response;
  } catch (error) {
    throw error;
  }
}
