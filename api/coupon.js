import axios from 'axios';
import { directusUrl } from './config';

export async function validateCoupon(filter) {
  try {
    const { data } = await axios.get(`${directusUrl}/items/coupons`, {
      params: {
        fields: '*.*',
        sort: '-id',
        filter: { ...filter },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
