import axios from 'axios';
import { backendUrl } from './config';

export async function sendContactUsEmail(payload) {
  try {
    const { data } = await axios.post(
      `${backendUrl}/pages/contact-us`,
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
}