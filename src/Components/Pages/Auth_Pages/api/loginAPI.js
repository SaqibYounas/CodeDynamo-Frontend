import { url } from '../Login_Pages/Port';

export const loginAPI = async (email, password) => {
  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return { status: res.status, data };
};
