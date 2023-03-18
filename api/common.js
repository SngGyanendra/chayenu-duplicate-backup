import axios from 'axios';
import { directusUrl } from './config';

export async function getAllProducts() {
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
}
export async function getAllCountries() {
  const { data } = await axios.get(`${directusUrl}/items/countries`, {
    params: {
      fields: '*.*',
      filter: {
        _or: [
          { has_distributors: { _eq: 'true' } },
          { has_shipping: { _eq: 'true' } },
        ],
      },
    },
  });
  return data;
}

export async function getAllStories() {
  const { data } = await axios.get(`${directusUrl}/items/stories`, {
    params: {
      fields: '*.*.*',
      filter: {
        _and: [{ status: { _eq: 'published' } }],
      },
    },
  });
  return data;
}

/**
 * Get one story by id
 * @param {string} id - Id of the story
 * @returns Story of not found exception
 */
export async function getStoryById(id) {
  const {
    data: { data },
  } = await axios.get(`${directusUrl}/items/stories/${id}`, {
    params: {
      fields: '*.*',
      filter: {
        status: {
          _eq: 'published',
        },
      },
    },
  });
  return data;
}
