import { url } from '../Port';

export const signupAPI = async (name, email, password) => {
  try {
    const response = await fetch(`${url}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error('Signup API Error:', error);
    return { status: 500, data: { message: 'Network Error' } };
  }
};
