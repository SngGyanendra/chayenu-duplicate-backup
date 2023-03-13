import decode from 'jwt-decode';
import { loginUser, logoutUser } from '/store/authSlice';
import { refreshTokens } from '/api';

async function redirectToLoginPage() {
  try {
    console.log('here');
    window.location.href = `${NEXT_PUBLIC_FRONTEND_URL}/login`;
  } catch (error) {}
}

function currentUserData() {
  return {
    id: localStorage?.getItem('id'),
    accessToken: localStorage?.getItem('token'),
    refreshToken: localStorage?.getItem('refreshToken'),
    email: localStorage?.getItem('email'),
    first_name: localStorage?.getItem('first_name'),
    last_name: localStorage?.getItem('last_name'),
  };
}

export async function refreshToken(dispatch) {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const accessTokenDecoded = decode(token);
    const refreshTokenDecoded = decode(refreshToken);
    const currentTime = new Date().getTime();
    if (accessTokenDecoded.exp - currentTime / 1000 < 0) {
      if (refreshTokenDecoded.exp - currentTime / 1000 < 0) {
        dispatch(logoutUser());
      } else {
        const data = await refreshTokens();
        dispatch(loginUser(data));
      }
    } else {
      const data = currentUserData();
      dispatch(loginUser(data));
      setTimeout(async () => {
        const data = await refreshTokens();
        dispatch(loginUser(data));
      }, accessTokenDecoded.exp * 1000 - currentTime);
    }
  } catch (error) {
    return;
  }
}
