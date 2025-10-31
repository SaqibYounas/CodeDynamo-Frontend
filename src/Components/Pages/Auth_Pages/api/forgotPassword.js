import { url } from '../Login_Pages/Port';

export const checkEmail = async (email) => {
  try {
    const response = await fetch(`${url}/auth/check-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ emailkey: email }),
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error('API Error:', error);
    return { status: 500, data: { message: 'Network Error' } };
  }
};
