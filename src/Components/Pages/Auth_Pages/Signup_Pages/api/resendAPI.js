import { url } from '../Port';

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

export async function resendCodeApi(email) {
  const response = await fetch(`${url}/auth/regenerate-otp`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return { status: response.status, data };
}
