import { url } from './Port';

export async function getMessage() {
  try {
    let response = await fetch(`${url}/user/message/get`, {
      method: 'GET',
      credentials: 'include',
    });
    let res = await response.json();
    console.log(res);
    if (Array.isArray(res)) {
      return res;
    } else {
      console.warn('❗ getMessage: Expected array, got', typeof res.data);
      return [];
    }
  } catch (err) {
    console.error('getMessage error:', err);
    return [];
  }
}
