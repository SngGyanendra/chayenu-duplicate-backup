import axios from 'axios';
import { directusUrl } from './config';

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${directusUrl}/items/products`, {
      params: {
        filter: {
          _and: [
            { student_only: { _eq: false } },
            { status: { _eq: 'published' } },
          ],
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
