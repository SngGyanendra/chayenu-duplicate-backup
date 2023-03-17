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



export * from './date.js'
