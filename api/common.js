import axios from 'axios';
import { directusUrl } from './config';

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${directusUrl}/items/products`, {
      params: {
        fields: '*.*.*',
        filter: {
          _and: [
            // { student_only: { _eq: false } },
            { status: { _eq: 'published' } },
            { is_on_subscription_page: { _eq: true } },
          ],
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
