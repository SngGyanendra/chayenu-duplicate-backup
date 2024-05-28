export function saveAuthData(values) {
  localStorage.setItem('token', values.accessToken);
  localStorage.setItem('refreshToken', values.refreshToken);
  localStorage.setItem('email', values.email);
  localStorage.setItem('id', values.id);
  localStorage.setItem('first_name', values.first_name);
  localStorage.setItem('last_name', values.last_name);
}
export function removeAuthData() {
  localStorage.clear();
}

export const getCountriesFromPlans = (plans) => {
  let countries = plans.map((plan) => plan.country);
  countries = countries.filter((country) => country !== null);

  return [
    ...new Map(countries.map((country) => [country.id, country])).values(),
  ];
};

export * from './date.js';
export * from './HydrateToken';
export * from './CheckAuth'
export * from './validateCreditCard.js'
export * from './autoScroll.js'
