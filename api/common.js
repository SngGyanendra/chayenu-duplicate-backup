import axios from "axios";
import { directusUrl } from "./config";

export async function getAllProducts({
  student_only = false,
  is_military_only = false,
  is_shluchim_only = false,
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
  };

  if (
    student_only === false &&
    is_military_only === false &&
    is_shluchim_only === false
  ) {
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

    filter._and.push({
      plans: {
        is_shluchim_only: {
          _eq: false,
        },
      },
    });

    deep.plans._filter.student_only = {
      _eq: false,
    };

    deep.plans._filter.is_military_only = {
      _eq: false,
    };

    deep.plans._filter.is_shluchim_only = {
      _eq: false,
    };
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
    };
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
    };
  }

  if (is_shluchim_only) {
    filter._and.push({
      plans: {
        is_shluchim_only: {
          _eq: true,
        },
      },
    });

    deep.plans._filter.is_shluchim_only = {
      _eq: true,
    };
  }

  const isMobile =
    typeof window !== "undefined" &&
    window &&
    window.matchMedia &&
    window.matchMedia("(max-width: 65rem)");
  
  const fields = [
    // Core fields
    "id",
    "status",
    "name",
    "description",
    "product_type",
    "price_description",
    "pricing_text",
    "order",
    "mobile_order",
    "tag_text",

    // Image
    "image.id",

    // Plans
    "plans.id",
    "plans.status",
    "plans.name",
    "plans.price",
    "plans.recurring",
    "plans.student_only",
    "plans.is_military_only",
    "plans.is_shluchim_only",

    // Country
    "plans.country.id",

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

  const { data } = await axios.get(`${directusUrl}/items/products`, {
    params: {
      fields: fields.join(","), // "*.*.*",
      filter,
      deep,
      sort: isMobile.matches ? "mobile_order" : "order",
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

export async function getAllStories(forSiteMap = false) {
  const { data } = await axios.get(`${directusUrl}/items/stories`, {
    params: {
      fields: forSiteMap ? "slug" : "*.*.*",
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
      sort: "order",
    },
  });

  return data;
}

export async function getAllPages() {
  const { data } = await axios.get(`${directusUrl}/items/Pages`, {
    params: {
      fields: "slug",
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

export async function getStoriesBySlug(slug) {
  const {
    data: { data },
  } = await axios.get(`${directusUrl}/items/stories`, {
    params: {
      fields: "*.*",
      filter: {
        status: {
          _eq: "published",
        },
        slug: {
          _eq: slug,
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

export async function getAllColleges() {
  try {
    const fields = [
      "id",
      "first_name",
      "last_name",
      "college_name",
      "country.id",
      "country.name",
    ];

    const { data } = await axios.get(`${directusUrl}/items/colleges?limit=-1`, {
      params: {
        fields: fields.join(",") // "*.*",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPageBySlug(slug, includeDraft = false) {
  const filter = {
    slug: {
      _eq: slug,
    },
  };

  if (includeDraft === false) {
    filter.status = {
      _eq: "published",
    };
  }

  const axiosParams = {
    params: {
      fields: "*.*.*.*.*.*",
      filter,
    },
  };

  const {
    data: { data },
  } = await axios.get(`${directusUrl}/items/Pages`, axiosParams);
  return data[0];
}

export async function getFaqSectionsWithFAQs() {
  const {
    data: { data },
  } = await axios.get(`${directusUrl}/items/faq_sections`, {
    params: {
      fields: "*.*",
    },
  });
  return data;
}

export async function getTrialProduct() {
  const filter = {
    _and: [
      {
        status: {
          _eq: "published",
        },
      },
      {
        is_on_subscription_page: {
          _eq: true,
        },
      },
      {
        product_type: {
          _eq: "Both",
        },
      },
      {
        plans: {
          student_only: {
            _eq: false,
          },
        },
      },
      {
        plans: {
          is_military_only: {
            _eq: false,
          },
        },
      },
      {
        plans: {
          is_shluchim_only: {
            _eq: false,
          },
        },
      },
      {
        name: {
          _eq: "Chayenu",
        },
      },
    ],
  };

  const deep = {
    plans: {
      _filter: {
        status: {
          _eq: "published",
        },
        recurring: {
          _eq: "Yearly",
        },
        country: {
          name: {
            _eq: "USA",
          },
        },
        student_only: {
          _eq: false,
        },
        is_military_only: {
          _eq: false,
        },
        is_shluchim_only: {
          _eq: false,
        },
      },
    },
  };

  const { data } = await axios.get(`${directusUrl}/items/products`, {
    params: {
      fields: "*.*.*.*",
      filter,
      deep,
      sort: "order",
    },
  });
  return data;
}

export async function getUploadBySlug(slug) {
  const filter = {
    slug: {
      _eq: slug,
    },
  };

  const axiosParams = {
    params: {
      fields: "*.*.*",
      filter,
    },
  };

  const {
    data: { data },
  } = await axios.get(`${directusUrl}/items/uploads`, axiosParams);
  return data[0];
}
