import { url } from '../Login_Pages/Port';

export const resetPasswordAPI = async (email, password) => {
  try {
    const response = await fetch(`${url}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: 'NETWORK_ERROR', data: null };
  }
};
