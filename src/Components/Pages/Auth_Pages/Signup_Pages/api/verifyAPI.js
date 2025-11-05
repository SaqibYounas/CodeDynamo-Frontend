import { url } from '../Port.jsx';

export async function verifyCodeApi(email, code) {
  const response = await fetch(`${url}/auth/verify`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });

  const data = await response.json();
  return { status: response.status, data };
}
