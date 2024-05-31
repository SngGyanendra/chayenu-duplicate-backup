import axios from 'axios';
import { directusUrl, backendUrl } from './config';

export async function getAllPlans(
  id, {
    is_military_only = false,
    is_shluchim_only = false,
    student_only = false,
  }
) {
  try {
    const filter = {
      _and: [
        { status: { _eq: 'published' } },
        { product: { id: { _eq: id } } },
      ],
    };

    filter._and.push({
      is_military_only: {
        _eq: is_military_only,
      },
    });

    filter._and.push({
      is_shluchim_only: {
        _eq: is_shluchim_only,
      },
    });

    filter._and.push({
      student_only: {
        _eq: student_only,
      },
    });

    const fields = [
      // Core fields
      "id",
      "status",
      "name",
      "price",
      "recurring",
      "student_only",
      "is_military_only",
      "is_shluchim_only",

      // Product Fields
      "product.id",
      "product.status",
      "product.name",
      "product.product_type",
      "product.is_on_subscription_page",
      "product.order",
      "product.mobile_order",

      // Country fields
      "country.id",
      "country.name",
      "country.has_distributors",
      "country.has_shipping",
      "country.braintree_name",
      "country.alpha_2_code",

      // State fields
      "country.states.id",
      "country.states.name",

      // distributor fields
      "country.distributors.id",
      "country.distributors.first_name",
      "country.distributors.last_name",
      "country.distributors.address_1",
      "country.distributors.address_2",
      "country.distributors.city",
      "country.distributors.state",
      "country.distributors.country.name",

      // Default coupon
      "default_coupon.id",
      "default_coupon.status",
      "default_coupon.name",
      "default_coupon.code",
      "default_coupon.description",
      "default_coupon.is_used",
      "default_coupon.frequency",
      "default_coupon.amount_type",
      "default_coupon.expiry_date",
      "default_coupon.amount",
      "default_coupon.require_cc",
      "default_coupon.limit_per_user",
      "default_coupon.coupon_limit",
    ];

    const { data } = await axios.get(`${directusUrl}/items/plans`, {
      params: {
        fields: fields.join(','), // '*.*.*.*',
        filter,
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
        mobile: values.mobile,
      },
      ...(values.college && { college: values.college }),
      ...(values.coupon && { coupon: values.coupon }),
      ...(values.distributor && { distributor: parseInt(values.distributor) }),
      is_trial: values.is_trial,
      plan: values.plan,
      quantity: values.quantity,
      // ...(!values.coupon && { card_nonce: values.card_nonce }),
      card_nonce: values.card_nonce,
      card_token: values.card_token,
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
        is_valid:values.is_validated,
        address_remarks:values.address_remarks,
        organization: values.organization,
      }),
    };
    const response = await axios.post(
      `${backendUrl}/subscription/addSubscription`,
      finalBody
    );
    return response;
  } catch (error) {
    throw error;
  }
}
