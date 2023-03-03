import decode from 'jwt-decode';
import { saveAuthData, removeAuthData } from '/util';
import { refreshTokens } from '/api';

export async function checkAndRefreshToken() {
  if (
    window.location.href === `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`
  ) {
    return;
  }
  const activeToken = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!activeToken || !refreshToken) return redirectToLoginPage();
  const activeTokenDecoded = decode(activeToken);
  const refreshTokenDecoded = decode(refreshToken);
  if (activeTokenDecoded?.exp < new Date().getTime() / 1000) {
    if (refreshTokenDecoded?.exp < new Date().getTime() / 1000) {
      return redirectToLoginPage();
    } else {
      try {
        const data = await refreshTokens();
        saveAuthData(data);
        return;
      } catch (error) {
        return redirectToLoginPage();
      }
    }
  }
}

async function redirectToLoginPage() {
  try {
    removeAuthData();
    window.location.href = `http://localhost:3000/login`;
  } catch (error) {}
}
