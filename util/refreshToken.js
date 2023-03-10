import decode from 'jwt-decode';
import { saveAuthData, removeAuthData } from '/util';
import { refreshTokens } from '/api';

export async function checkAndRefreshToken() {
  if (window.location.href === `http://localhost:3000/login`) {
    return;
  }

  const activeToken = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!activeToken || !refreshToken) return redirectToLoginPage();
  const activeTokenDecoded = decode(activeToken);
  const refreshTokenDecoded = decode(refreshToken);
  if (activeTokenDecoded?.exp < new Date().getTime() / 1000 - 100) {
    if (refreshTokenDecoded?.exp < new Date().getTime() / 1000 - 20) {
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

export async function refreshToken() {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const accessTokenDecoded = decode(token);
    const refreshTokenDecoded = decode(refreshToken);
    const currentTime = new Date().getTime();
    if (accessTokenDecoded.exp - currentTime / 1000 < 0) {
      if (refreshTokenDecoded.exp - currentTime / 1000 < 0) {
        redirectToLoginPage();
      } else {
        const data = await refreshTokens();
        saveAuthData(data);
      }
    } else {
      setTimeout(async () => {
        const data = await refreshTokens();
        saveAuthData(data);
      }, accessTokenDecoded.exp * 1000 - currentTime);
    }
  } catch (error) {
    return;
  }
}
