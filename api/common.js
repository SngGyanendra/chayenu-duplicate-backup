import axios from "axios";
import { directusUrl } from "./config";

export async function getAllProducts({
  student_only = false,
  is_military_only = false,
}) {
  const filter = {
    _and: [
      { status: { _eq: "published" } },
      { is_on_subscription_page: { _eq: true } },
    ],
  };

  const deep = {
    plans: {
      _filter: {
        status: {
          _eq: "published",
        },
      },
    },
  }

  if (student_only === false && is_military_only === false) {
    filter._and.push({
      plans: {
        student_only: {
          _eq: false,
        },
      },
    });

    filter._and.push({
      plans: {
        is_military_only: {
          _eq: false,
        },
      },
    });
  }

  if (student_only) {
    filter._and.push({
      plans: {
        student_only: {
          _eq: true,
        },
      },
    });

    deep.plans._filter.student_only = {
      _eq: true,
    }
  }

  if (is_military_only) {
    filter._and.push({
      plans: {
        is_military_only: {
          _eq: true,
        },
      },
    });

    deep.plans._filter.is_military_only = {
      _eq: true,
    }
  }

  const { data } = await axios.get(`${directusUrl}/items/products`, {
    params: {
      fields: "*.*.*",
      filter,
      deep,
      sort: "order",
    },
  });
  return data;
}
export async function getAllCountries() {
  const { data } = await axios.get(`${directusUrl}/items/countries`, {
    params: {
      fields: "*.*",
      filter: {
        _or: [
          { has_distributors: { _eq: "true" } },
          { has_shipping: { _eq: "true" } },
        ],
      },
    },
  });
  return data;
}

export async function getAllStories() {
  const { data } = await axios.get(`${directusUrl}/items/stories`, {
    params: {
      fields: "*.*.*",
      filter: {
        _and: [{ status: { _eq: "published" } }],
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
      fields: "*.*",
      filter: {
        status: {
          _eq: "published",
        },
      },
    },
  });
  return data;
}

export async function getAllCancelReasons() {
  try {
    const { data } = await axios.get(`${directusUrl}/items/cancel_reasons`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllSupportIssues() {
  try {
    const { data } = await axios.get(`${directusUrl}/items/support_issues`, {
      params: {
        fields: "*.*",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
