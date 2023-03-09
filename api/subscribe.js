import axios from 'axios';
import { directusUrl, backendUrl } from './config';

export async function getAllPlans(id) {
  try {
    const { data } = await axios.get(`${directusUrl}/items/plans`, {
      params: {
        fields: '*.*.*.*',
        filter: {
          _and: [
            // { student_only: { _eq: false } },
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

export async function addNewSubscription(values) {
  try {
    const finalBody = {
      auto_renew: values.auto_renew,
      college: values.college,
      contact: {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email.toLowerCase(),
      },
      ...(values.coupon && { coupon: values.coupon }),
      is_trial: values.is_trial,
      plan: values.plan,
      quantity: values.quantity,
      ...(!values.coupon && { card_nonce: values.card_nonce }),
      ...(values.address_1 && {
        billing_address: {
          first_name: values.first_name,
          last_name: values.last_name,
          address_1: values.address_1,
          address_2: values.address_2,
          city: values.city,
          state: values.state,
          zip_code: values.zip_code,
          country: values.country,
        },
      }),
    };
    const response = await axios.post(
      `${backendUrl}/subscription/addSubscription`,
      finalBody
    );
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}