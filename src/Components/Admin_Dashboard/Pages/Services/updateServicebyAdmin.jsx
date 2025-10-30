import { url } from './Port';

export async function updateServicesByAdmin(id, status, page) {
  try {
    let response = await fetch(`${url}/admin/services/user/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        id,
        status,
        page,
      }),
    });

    let data = await response.json();
    console.log(data);
    if (response.ok) {
      return data.message;
    } else {
      return data.message;
    }
  } catch (error) {
    console.log('profile save error', error);
    return 0;
  }
}
