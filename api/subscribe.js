import axios from 'axios';
import { directusUrl } from './config';

export async function getAllPlans(id) {
  try {
    const { data } = await axios.get(`${directusUrl}/items/plans`, {
      params: {
        fields: '*.*',
        filter: {
          _and: [
            { student_only: { _eq: false } },
            { status: { _eq: 'published' } },
            { product: { id: { _eq: id } } },
          ],
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
