import decode from 'jwt-decode';
import { saveAuthData, removeAuthData } from '/util';
import { refreshTokens } from '/api';

export async function checkAndRefreshToken() {
  if (window.location.href === `http://localhost:3000/login`) {
    return;
  }
  // const activeToken = localStorage.getItem('token');
  const activeToken = localStorage.getItem(
    'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzgyODY2NjUsImlhdCI6MTY3ODI4NjYwNX0.yNewTv4pQp0_K3U4zZe_rzrx_SYQXj8L3SP7YSCRuQE'
  );
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
